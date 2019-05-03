import React, { Component } from 'react';
import Home from './home';
import SignedInAs from './signed_in_as';
import Logout from './logout';
import Contact from './contact';
import ArtistContent from './artist_content';

// Artist App class
class ArtistApp extends Component {

  // Render artist page
  render() {
    return (
      <div>
        <Home />
        <SignedInAs />
        <ArtistContent />
        <Logout />
      </div>
    );
  }
}

export default ArtistApp;
