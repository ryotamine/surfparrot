const express         = require("express");
const router          = express.Router();
const app             = express();
const PORT            = 5000
const cheerio         = require("cheerio");
const request         = require("request");
const cors            = require("cors");
const moment          = require("moment");
const entities        = require("entities");
const bcrypt          = require("bcrypt");
const cookieSession   = require("cookie-session");

const getSpotifyToken = require('./getSpotifyToken');
const passport        = require("passport-local")
const bodyParser      = require("body-parser");
const capitalize      = require('capitalize');
const querystring     = require ('querystring')

// Create AJAX DB environment
const environment   = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('./knexfile')[environment]; // require environment's settings from knexfile
const database      = require('knex')(configuration);   

require('dotenv').config()
const SPOTIFY_CLIENT_ID  = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET  = process.env.SPOTIFY_CLIENT_SECRET ;
app.use(cors());

// Code to receive info from the front-end and parse correctly
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

function generateRandomString() {
  let text = "";
  let str = "0123456789";
  for (let i = 0; i < 5; i++) {
    text += str.charAt(Math.floor(Math.random() * str.length));
  }
  return text;
}

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

//Connecting to Spotify login
const redirect_uri = 'http://localhost:5000/callback';
const stateKey = 'spotify_auth_state';

app.get('/login-recommendations', function(req, res) {
  console.log("~~~~~~~~~~~~~~~~~~getroute")
  var state = generateRandomString(16);
  req.session[stateKey] = state;

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id:  SPOTIFY_CLIENT_ID,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  console.log("req.query.statre", req.query.state)
  console.log("req.session", req.session)
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.session ? req.session[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        // var options = {
        //   url: 'https://api.spotify.com/v1/me',
        //   headers: { 'Authorization': 'Bearer ' + access_token },
        //   json: true
        // };
          //redirect to recommendations page
        res.redirect('http://localhost:3000/recommendations/?' +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }));
         
      } else {
        res.redirect('/?' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});


// POST artist registration to database
app.post("/register", (req, res) => {
  console.log(req.body, req.params.id);
  const artistId = generateRandomString();
  database.insert([{
    id: artistId,
    musician_first_name: req.body.firstName, 
    musician_last_name: req.body.lastName, 
    musician_email: req.body.email, 
    password_digest: bcrypt.hashSync(req.body.password, 10)}]
  )
  .into("User_musician")
  .then((result) => {
    console.log("result", result);
    res.json({url1: `/artists/${artistId}`, abc: 12})
  });

  // Check if musician email already exists
  // for (let musicianId in database) {
  //   if (req.body.email === database[musicianId].musician_email) {
  //     res.status(400).send("Invalid. Please try again.");
  //   }
  // }

  // Check for musician registration errors
  // if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
  //   res.status(400).send("Invalid. Please try again.");
  //   return;
  // }
});

// GET user registration
// app.get("/register", (req, res) => {
//   // ...
// });

// POST user registration
app.post("/register", (req, res) => {
  console.log(req.body, req.params.id);
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
    console.log("result", result);
    res.json({url2: `/users/${userId}`, abc: 12})
  });

  // Check if artist email already exists
  // for (let artistId in database) {
  //   if (req.body.email === database[artistId].fan_email) {
  //     res.status(400).send("Invalid. Please try again.");
  //   }
  // }

  // Check for artist registration errors
  // if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
  //   res.status(400).send("Invalid. Please try again.");
  //   return;
  // }
});

app.post("/saveEvent", (req, res) => {
  database.insert([{
    event: req.body.eventName, 
    date: req.body.eventDate, 
    location: req.body.eventLocation, 
    song: req.body.songLink
  }])
  .into("Event").then(function (res) {
  })
  res.send({ express: 'CREATE A NEW EVENT' });
});


// Passport example
// const { dbConfig } = require('pg')
// //configure Postgres Pool
// const dbConfig = {
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database,
//   host: config.db.host,
//   port: config.db.port,
//   max: config.db.max,
//   idleTimeoutMillis: config.db.idleTimeoutMillis,
// }
// const pool = new pg.Pool(dbConfig)
// pool.on('error', function (err) {
//   winston.error('idle client error', err.message, err.stack)
// })

// // expose Postgres interface to use in other modules
// module.exports = {
//   query: (text, params, callback) => {
//     return pool.query(text, params, callback)
//   }
// }

// app.use(passport.initialize())
// app.use(passport.session())

// // configure passport-local strategy
// passport.use(new LocalStrategy((musician_email, password_digest, cb) => {
//   db.query('SELECT id, musician_email, password_digest, type FROM users WHERE musician_email=$1', [username], (err, result) => {
//     if(err) {
//       winston.error('Error when selecting user on login', err)
//       return cb(err)
//     }

//     if(result.rows.length > 0) {
//       const first = result.rows[0]
//       bcrypt.compare(password_digest, first.password_digest, function(err, res) {
//         if(res) {
//           cb(null, { id: first.id, musician_email: first.musician_email, type: first.type })
//          } else {
//           cb(null, false)
//          }
//        })
//      } else {
//        cb(null, false)
//      }
//   })
// }))

// // persist and load user info to session cookie
// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })

// passport.deserializeUser((id, cb) => {
//   db.query('SELECT id, musician_email, type FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
//     if(err) {
//       winston.error('Error when selecting user on session deserialize', err)
//       return cb(err)
//     }

//     cb(null, results.rows[0])
//   })
// })

// app.post('/api/login', passport.authenticate('local'), users.login)

// GET www.rotate.com for show listings
app.get('/showInfo', (req, res) => {
  request('http://www.rotate.com/tickets', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(body);
      $('.post-content script').each((i, el) => {
        let listings = (JSON.parse(el.children[0].data));
        const listingData = listings.map(listing => ({
          Event: entities.decodeHTML(capitalize.words(listing.name).split(':').pop()),
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

app.get('/healthcheck', (req, res) => {
  res.status(200).json({
    message: 'success!'
  });
});

// GET Spotify token
app.get('/spotify_token', (req, res) => {
  getSpotifyToken({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
    },
    (_, token) => {
      // console.log("BACKEND token: ", token)
      res.status(200).json({token})
    }
  );
});

// GET Spotify refresh token
app.get('/refresh_token', function(req, res) {
  // Requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  // console.log("refresh_token: ", refresh_token);
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };
  
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

// Boot server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
