import React, { Component } from 'react';
import Scrape from './external-show-listings/scrape';
import App from './App';


// Home class
class Redirect extends Component {
  constructor (props) {
  super(props);
  this.state = 
  {
    listingData: [{
      Date: this.props.date,
      Event: this.props.Event,
      Location: this.props.Location
    }],
  };
  this.handleClick = this.handleClick.bind(this);
  
}
  render() {
    return (
      <div>
        <p>Couldn't find this artist on Spotify. 
          <a href="http://www.google.com/search?q=${this.props}"> here to search Google</a></p>
      </div>
        
    );
  }
}

export default Redirect