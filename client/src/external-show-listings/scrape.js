import React, { Component } from 'react';
import request from 'request';
import ReactTable from 'react-table';

class Scrape extends Component {
  constructor (props) {
    super(props);
    this.state = {listingData: []};
  }


  componentDidMount() {
    this.getConcertData()
  }
  getConcertData() {

    request('http://localhost:5000/showInfo', {json: true}, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        this.setState({listingData: body.listingData});

      }
    });
  }

  render () {

    const columns = [
      {
        Header: 'Event',
        accessor: 'Event'
      },
      {
        Header: 'Date',
        accessor: 'Date'
      },
      {
        Header: 'Location',
        accessor: 'Location'
      }
    ];

    return (
      <div>
        <ReactTable
          data={this.state.listingData}
          columns={columns}
          defaultPageSize={3}
          pageSizeOptions={[3, 6]}
        />
      </div>
    );
  }  
} 
export default Scrape;
