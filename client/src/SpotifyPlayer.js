import React, { Component } from 'react';

class SpotifyPlayer extends Component {



<<<<<<< HEAD
	render() {
			return <iframe id="spotifyPlayer" src={`https://open.spotify.com/embed/artist/${this.props.artistid}`} 
				width="300" 
				height="80" 
				frameBorder="0" 
				allowtransparency="true" 
				allow="encrypted-media">
			</iframe>
	}
=======
    render() {
        return <iframe src={`https://open.spotify.com/embed/artist/${this.props.artistid}`} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>

    }

>>>>>>> spotify
}

export default SpotifyPlayer;