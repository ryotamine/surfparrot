const request = require('request');
const cheerio = require('cheerio');


request('http://www.rotate.com/tickets', (error, response, body) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(body);
    $('.post-content script').each((i, el) => {
      listing = (JSON.parse(el.children[0].data));
      // console.log(listing);
      const date = new Map(listing.map(x => [x.startDate]));
      const name = new Map(listing.map(x => [x.name]));
      const location = new Map(listing.map(x => [x.location.name]));
      console.log (name, date, location)
      
      
    });
  }
});

    // { '@context': 'http://schema.org',
    // '@type': 'Event',
    // name: 'BEAR&#8217;S DEN',
    // startDate: '2019-05-24T00:00:01',
    // typicalAgeRange: '19+',
    // performers: { '@type': 'Organization', name: 'BEAR&#8217;S DEN' },
    // location: { '@type': 'Place', name: 'PHOENIX', address: [Object] },
    // offers: { '@type': 'Offer', price: '$29.00' } },

