import React, { Component } from 'react';
import ArtistNavbar from './navbar_artist';
import SignedInAs from './signed_in_as';
import ArtistContent from './artist_content';

// Artist App class
class ArtistApp extends Component {

  // Render artist page
  render() {
    return (
      <div>
        <ArtistNavbar />
        <SignedInAs />
        <ArtistContent />
      </div>
    );
  }
}

export default ArtistApp;
