const express       = require("express");
const app           = express();
const PORT          = 5000
const cheerio       = require("cheerio");
const request       = require("request");
const cors          = require("cors");
const moment        = require("moment");
const entities      = require("entities");
const bcrypt        = require("bcrypt");
const cookieSession = require("cookie-session");

app.use(cors());

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

// Boot server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
