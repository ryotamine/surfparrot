import React, { Component } from 'react';
import Navbar from '/navbar';
import SignedInAs from '/signed_in_as';
import ArtistContent from '/artist_content';

// Artist App class
class ArtistApp extends Component {

  // Render artist page
  render() {
    return (
      <div>
        <Navbar />
        <SignedInAs />
        <ArtistContent />
      </div>
    );
  }
}

export default ArtistApp;
