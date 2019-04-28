import React, { Component } from 'react';

class SpotifyPlayer extends Component {



    render() {
        return <iframe src={`https://open.spotify.com/embed/artist/${this.props.artistid}`} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

    }

}

export default SpotifyPlayer;