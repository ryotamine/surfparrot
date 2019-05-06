import React, { Component } from 'react';
import NavbarArtist from './navbar_artist';
import SignedInAs from './signed_in_as';
import ArtistContent from './artist_content';

// Artist App class
class ArtistApp extends Component {
  constructor(props) {
    super(props);
    this.textEvent = React.createRef();
    this.state = {
      name: 'John'
    }
  }

  handleName = evt => {
    this.setState({name: evt.target.value})
  }

  // Render artist page
  render() {
    return (
      <div>
        <NavbarArtist name={this.state.name} handleName={this.handleName} ref={this.textEvent}/>
        <SignedInAs />
        <ArtistContent name={this.state.name} ref={this.textEvent}/>
      </div>
    );
  }
}

export default ArtistApp;
