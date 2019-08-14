const express         = require("express");
const router          = express.Router();
const app             = express();
const PORT            = 5000;
const cheerio         = require("cheerio");
const request         = require("request");
const cors            = require("cors");
const moment          = require("moment");
const entities        = require("entities");
const bcrypt          = require("bcrypt");
const cookieSession   = require("cookie-session");
const getSpotifyToken = require("./getSpotifyToken");
const passport        = require("passport-local");
const bodyParser      = require("body-parser");
const capitalize      = require("capitalize");
const querystring     = require ("querystring");
const cookieParser    = require("cookie-parser");

app.use(cookieParser());
app.use(cors());

// Create AJAX DB environment
const environment   = process.env.NODE_ENV || "development"; // if something else isn't setting ENV, use development
const configuration = require("./knexfile")[environment]; // require environment's settings from knexfile
const database      = require("knex")(configuration);   

require("dotenv").config()
const SPOTIFY_CLIENT_ID  = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET  = process.env.SPOTIFY_CLIENT_SECRET ;
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

// Code to receive info from the front-end and parse correctly
app.use(bodyParser.json());

// Generate string of 5 random numeric characters
function generateRandomString() {
  let text = "";
  let str = "0123456789";
  for (let i = 0; i < 5; i++) {
    text += str.charAt(Math.floor(Math.random() * str.length));
  }
  return text;
}

// Initiate cookie session
app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"]
}))

// Connecting to Spotify login
const redirect_uri = "http://localhost:5000/callback";
const stateKey = "spotify_auth_state";

app.get("/login-recommendations", function(req, res) {
  var state = generateRandomString(16);
  req.session[stateKey] = state;

  // Your application requests authorization
  const scope = "user-read-recently-played, user-follow-read, user-top-read"; 
  res.redirect("https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id:  SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get("/callback", function(req, res) {
  // Your application requests refresh and access tokens after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.session ? req.session[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect("/#" +
      querystring.stringify({
        error: "state_mismatch"
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        "Authorization": "Basic " + (new Buffer(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString("base64"))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        req.session.access_token = body.access_token
        req.session.refresh_token = body.refresh_token;
        req.session.expiry_time = new Date(Date.now());
        console.log ("~~~~~~~~~~~~~~~~~~EXPIRY TIME", req.session.expiry_time)
        console.log("~~~~~~~~~~req.session", req.session)
        console.log("~~~~~~~~~~~~~req.session.access_token", req.session.access_token)
        // var options = {
        //   url: "https://api.spotify.com/v1/me",
        //   headers: { "Authorization": "Bearer " + access_token },
        //   json: true
        // };
        // Redirect to recommendations page
        res.redirect("http://localhost:3000/recommendations/")
         
      } else {
        res.redirect("/?" +
          querystring.stringify({
            error: "invalid_token"
          }));
      }
    });
  }
});

app.get("/user_token", function(req, res) {
  console.log("~~~~~~~~~~~~~~~sending user token", req.session)
  res.json({
    user_token: req.session.access_token
  });
})

app.get("/user_refresh_token", function(req, res) {
  // Requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: { "Authorization": "Basic " + (new Buffer(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString("base64")) },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        "access_token": access_token
      });
    }
  });
});

app.get("/", function (req, res) {
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies)
})

// POST artist registration to database
app.post("/register/artist", (req, res) => {
  const artistId = generateRandomString();
  database.insert([{
    id: artistId,
    musician_first_name: req.body.firstName, 
    musician_last_name: req.body.lastName, 
    musician_email: req.body.email, 
    password_digest: bcrypt.hashSync(req.body.password, 10)}
  ])
  .into("User_musician")
  .then((result) => {
    res.json({url1: `/artists/${artistId}`, abc: 12})
  });
});

app.get("/events", (request, response) => {
  alert("HITS");
  response.send("hello there")
  database("Event").select()
    .then((events) => {
      response.status(200).json(events);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// POST user registration to database
app.post("/register/user", (req, res) => {
  const userId = generateRandomString();
  database.insert([{
    id: userId,
    fan_first_name: req.body.firstName, 
    fan_last_name: req.body.lastName, 
    fan_email: req.body.email, 
    password_digest: bcrypt.hashSync(req.body.password, 10)}]
  )
  .into("User_fan")
  .then((result) => {
    res.json({url2: `/users/${userId}`, abc: 12})
  });
});

// POST user login and compare to registration database
app.post("/login/artist", (req, res) => {
  let error = false;
  let login = false;
  let artist = true;
  let password = false;
  if (req.body.artist) {
    database.from("User_musician").select("id", "password_digest").where({
      musician_email: req.body.email
    }).asCallback((err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).end();
        return
      } else {
        let result = bcrypt.compareSync(req.body.password, rows[0].password_digest)
          console.log("DID PASSWORD MATCH??? =>  ",result)
          if (result === true) {
            login = true;
            res.send({user_id: rows[0].id, artist: true})
          } else {
            res.send({error: "Incorrect password"});
            console.log("incorrect password");
          }
        console.log("Password matches", login);
      };
    });
  } else {
  }
});

// POST save event
app.post("/saveEvent", (req, res) => {
  database.insert([{
    userMusicianId:database.from("User_musician").select("id").limit(1),
    event: req.body.eventName, 
    date: req.body.eventDate, 
    location: req.body.eventLocation, 
    song: req.body.songLink
  }])
  .into("Event").then(function (res) {
  })
  console.log("res", res);
  console.log("req", req);
  res.send({ express: "CREATE A NEW EVENT" });
});

app.post("/events/userEvents", (req, res) => {
  var userId = req.body.id
  database("Event")
  .where({userMusicianId: userId })
  .select ("id", "event", "date", "location")
  .then(function(result) {
    // if no events found:
    if (!result || !result[0])  {
      console.log("No events found for this user.")
      return;
    } else {
      res.send
      ({
        result: result
      });
    }; 
  });
});

// Delete an event from the musician profile
app.delete("/events/userEvents/delete", (req, res) => {
  var eventId = req.body.id
  database("Event")
  .where({"id": eventId })
  .del()
  .then(function(result) {
    // If no events found
    if (!result || !result[0])  {
      console.log("event deleted.")
      res.send ({status: "okay"})
      return;
    } else {
      console.log("what happened? I guess this event lasts forever")
      res.send
      ({
        result: result
      });
    }
  })
});

// GET artist
app.get("/user", (req, res) => {
  var usernameReq = req.body.username;
  var passwordReq = req.body.password;
  database("User_musician")
    .where({ username: usernameReq })
    .select("password")
    .then(function(result) {
    if (!result || !result[0])  {  // Not found!
      // Report invalid username
      return;
    }
    var pass = result[0].password;
    if (passwordReq === pass) {
      // Login
    } else {
      // Failed login
    }
  })
  .catch(function(error) {
    console.log(error);
  });
});

// GET www.rotate.com for show listings
app.get("/showInfo", (req, res) => {
  request("http://www.rotate.com/tickets", (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(body);
      $(".post-content script").each((i, el) => {
        let listings = (JSON.parse(el.children[0].data));
        const listingData = listings.map(listing => ({
          Event: entities.decodeHTML(capitalize.words(listing.name).split(":").pop()),
          Date: moment(listing.startDate).format("MMMM Do YYYY"),
          Location: entities.decodeHTML(capitalize.words(listing.location.name))
        }));
        res.json({listingData: listingData}); 
      });
    }
  });
});

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/healthcheck", (req, res) => {
  res.status(200).json({
    message: "success!"
  });
});

// GET Spotify token
app.get("/spotify_token", (req, res) => {
  getSpotifyToken({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET
    },
    (_, token) => {
      res.status(200).json({token});
    }
  );
});

// GET Spotify refresh token
app.get("/refresh_token", function(req, res) {
  // Requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: { "Authorization": "Basic " + (new Buffer(client_id + ":" + client_secret).toString("base64")) },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };
  
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        "access_token": access_token
      });
    }
  });
});

// Boot server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
