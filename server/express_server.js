const express       = require("express");
const app           = express();
const PORT          = 5000
const cheerio       = require("cheerio");
const request       = require("request");
const cors          = require("cors");
const moment        = require("moment");
const entities      = require("entities");
const bcrypt        = require("bcryptjs");
const cookieSession = require("cookie-session");
const getSpotifyToken = require('./getSpotifyToken');
const passport = require("passport-local")


require('dotenv').config()
const SPOTIFY_CLIENT_ID  = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET  = process.env.SPOTIFY_CLIENT_SECRET ;
app.use(cors());

const { dbConfig } = require('pg')
//configure Postgres Pool
const dbConfig = {
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  host: config.db.host,
  port: config.db.port,
  max: config.db.max,
  idleTimeoutMillis: config.db.idleTimeoutMillis,
}
const pool = new pg.Pool(dbConfig)
pool.on('error', function (err) {
  winston.error('idle client error', err.message, err.stack)
})

// expose Postgres interface to use in other modules
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}

app.use(passport.initialize())
app.use(passport.session())

// configure passport-local strategy
passport.use(new LocalStrategy((musician_email, password_digest, cb) => {
  db.query('SELECT id, musician_email, password_digest, type FROM users WHERE musician_email=$1', [username], (err, result) => {
    if(err) {
      winston.error('Error when selecting user on login', err)
      return cb(err)
    }

    if(result.rows.length > 0) {
      const first = result.rows[0]
      bcrypt.compare(password_digest, first.password_digest, function(err, res) {
        if(res) {
          cb(null, { id: first.id, musician_email: first.musician_email, type: first.type })
         } else {
          cb(null, false)
         }
       })
     } else {
       cb(null, false)
     }
  })
}))

// persist and load user info to session cookie
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, cb) => {
  db.query('SELECT id, username, type FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
    if(err) {
      winston.error('Error when selecting user on session deserialize', err)
      return cb(err)
    }

    cb(null, results.rows[0])
  })
})

app.post('/api/login', passport.authenticate('local'), users.login)

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// GET www.rotate.com for show listings
app.get('/showInfo', (req, res) => {
  request('http://www.rotate.com/tickets', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(body);
      $('.post-content script').each((i, el) => {
        let listings = (JSON.parse(el.children[0].data));
        const listingData = listings.map(listing => ({
          Event: entities.decodeHTML(listing.name),
          Date: moment(listing.startDate).format("MMMM Do YYYY"),
          Location: entities.decodeHTML(listing.location.name)
        }))
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
  })
})


app.get('/spotify_token', (req, res) => {
  getSpotifyToken({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
    },
    (_, token) => {
      console.log("BACKEND token: ", token)
      res.status(200).json({token})
    }
  )
})


app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  console.log("refresh_token: ", refresh_token)
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

// 2019-04-27T00:00:01
