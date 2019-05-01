import React, { Component } from 'react';
import request from 'request';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import App from '../App';


class Scrape extends Component {
  constructor (props) {
    super(props);
    this.getArtist = this.getArtist.bind(this);
    this.state = 
    {
      listingData: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    this.getConcertData()
  }

//calls server to get data for the table
  getConcertData() {
    request('http://localhost:5000/showInfo', {json: true}, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        this.setState({listingData: body.listingData});
      }

    });
  }
  handleClick() {
    console.log("scrape handleClick Works")
    getArtist(row.value) 
    this.props.artistName
  }

//construct the table.
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
        Header: 'Event',
        accessor: 'Event',
        Cell: row => ( 
          <div>
            <button onClick={this.handleClick} id="${row.value}">Listen to {row.value}</button>
          </div> )
      }
    ];
//display the table
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
