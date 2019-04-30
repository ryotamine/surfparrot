import React, { Component } from 'react';
import request from 'request';
import ReactTable from 'react-table';
import "react-table/react-table.css";


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
        accessor: 'Event',
      },
      {
        Header: 'Date',
        accessor: 'Date'
      },
      {
        Header: 'Location',
        accessor: 'Location',
        Cell: row => {
        const url = `https://www.google.com/maps/search/${row.value}+Toronto`
        return <a href={url} target="_blank" rel="noopener noreferrer">{row.value}</a>
        }
      },
      {
        Header: 'Listen',
        Cell: row => ( 
          <div>
            <button>Listen</button>
          </div> )
      }
    ];
    return (
    <div>
        <ReactTable className="-striped"
          data={this.state.listingData}
          columns={columns}
          defaultPageSize={20}     
          style={{
              height: "400px"
          }}
        />
      </div>
    );
  }  
} 
export default Scrape;
