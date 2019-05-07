import React, { Component } from 'react';
import request from 'request';
import ReactTable from 'react-table';
import "react-table/react-table.css";
// import App from '../App';


class Scrape extends Component {
  constructor (props) {
    super(props);
    this.state = 
    {
      listingData: [{
        Date: this.date,
        Event: this.Event,
        Location: this.Location
      }],
    };
    this.handleClick = this.handleClick.bind(this);
    
  }
  
  componentDidMount() {
    this.getConcertData()
  }

  //filters out recommended artists
  getConcertData() {
    request('http://localhost:5000/showInfo', {json: true}, (error, response, body) => {
     const array = [];
    for (let i of this.props.recommendedArtists) {
      for (let j of body.listingData) {
        if (j.Event === i) array.push(j)
      } 
    }
      if (!error && response.statusCode === 200) {
        this.setState({listingData: array});
      }
    });
  }

  handleClick(eventName) {
    this.props.handleSubmit(eventName)

   //  this.props.getArtist(this.state.listingData.name)
  // console.log("this state listing data event name", this.state.listingData[0].Event)
   console.log("this state listing data event name", eventName)
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
        Header: 'Listen',
        accessor: 'Event',
        Cell: row => { 
          const artistButtonClicked = () => {
            this.handleClick(row.value) 
          }
          return ( 
            <div>
             <button onClick={artistButtonClicked} id={row.value}><i className="fas fa-volume-up"></i>  {row.value}</button>
            </div> 
          )
        }
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