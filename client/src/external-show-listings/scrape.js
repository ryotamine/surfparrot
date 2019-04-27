const request    = require('request');
const cheerio    = require('cheerio');
const ReactTable = require('react-table');
const JSON       = require('json');

//scraper

class scrape extends Component {
  
  render () {
    request('http://www.rotate.com/tickets', (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(body);
        $('.post-content script').each((i, el) => {
          let listing = (JSON.parse(el.children[0].data));
          const date = new Map(listing.map(x => [x.startDate]));
          const name = new Map(listing.map(x => [x.name]));
          const location = new Map(listing.map(x => [x.location.name]));
          console.log (name, date, location)
        
     const listingData = [{
       Event: [name],
       Date: [date],
       Location: [location]
     }]
  
     const columns = [{
       Header: 'Event',
       accessor: 'Event'},
       {
        Header: 'Date',
        accessor: 'Date'},
        {
          Header: 'Location',
          accessor: 'Location'}];

    
  return (
    <div>
        <ReactTable>
          data={listingData}
          columns={columns}
          defaultPageSize={3}
          pageSizeOptions={[3, 6]}
        </ReactTable>
    </div>     
);
  });
}
  });
  }
}
export default scrape;
