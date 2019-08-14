import React, { Component } from "react";

// Spotify player class
class SpotifyPlayer extends Component {
	render() {
		return <iframe title="SpotifyPlayer" id="spotifyPlayer" src={`https://open.spotify.com/embed/artist/${this.props.artistid}`} 
			width="300" 
			height="80" 
			frameBorder="0" 
			allowtransparency="true" 
			allow="encrypted-media">
		</iframe>
	}
}

export default SpotifyPlayer;
