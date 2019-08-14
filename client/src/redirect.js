import React, { Component } from "react";

// Home class
class Redirect extends Component {
  // Home constructor
  constructor(props) {
    super(props);

    this.state = 
    {
      listingData: [{
        Date: this.props.date,
        Event: this.props.Event,
        Location: this.props.Location
      }]
    };
  }

  // Render home page
  render() {
    return (
      <div>
        <p>Couldn't find this artist on Spotify. 
          <a href="http://www.google.com/search?q=${this.props}"> here to search Google</a>
        </p>
      </div>   
    );
  }
}

export default Redirect;
