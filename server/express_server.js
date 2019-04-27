const express       = require("express");
const app           = express();
const PORT          = 5000
const cheerio       = require("cheerio");
const request       = require("request");
const cors          = require("cors");
const moment        = require("moment");

app.use(cors());

app.get('/showInfo', (req, res) => {
  request('http://www.rotate.com/tickets', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(body);
      $('.post-content script').each((i, el) => {
        let listings = (JSON.parse(el.children[0].data));
        const listingData = listings.map(listing => ({
          Event: listing.name,
          Date: moment(listing.startDate).format("MMMM Do YYYY"),
          Location: listing.location.name
        }))
        res.json({listingData: listingData}); 
      });
    }
  });
});


// Boot server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});


// 2019-04-27T00:00:01


