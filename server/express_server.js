const express       = require("express");
const router        =express.Router();
const app           = express();
const PORT          = 5000
const cheerio       = require("cheerio");
const request       = require("request");
const cors          = require("cors");
const moment        = require("moment");
const entities      = require("entities");
//const bcrypt        = require("bcryptjs");
const cookieSession = require("cookie-session");
const getSpotifyToken = require('./getSpotifyToken');
const capitalize    = require('capitalize');

const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const configuration = require('./knexfile')[environment];    // require environment's settings from knexfile
const database      = require('knex')(configuration);   

require('dotenv').config()
const SPOTIFY_CLIENT_ID  = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET  = process.env.SPOTIFY_CLIENT_SECRET ;
app.use(cors());


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
          Event: entities.decodeHTML(capitalize.words(listing.name).split(':').pop()),
          Date: moment(listing.startDate).format("MMMM Do YYYY"),
          Location: entities.decodeHTML(capitalize.words(listing.location.name))
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
