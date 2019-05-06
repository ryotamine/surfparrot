import React, { Component } from 'react';
import axios from 'axios';
import Home from './home';
import Scrape from './external-show-listings/scrape';
import SpotifyPlayer from './SpotifyPlayer.js';
import NameForm from './name_form';

// App class
class App extends Component {
  // App constructor
  constructor(props) {
  super(props);
  this.getArtist = this.getArtist.bind(this);
  }

  state = {
    token: null,
    artist: '43ZHCT0cAZBISjO8DG9PnE', 
    searchTerm: "",
    artistName: "",
    data: null
  };

  // shouldComponentUpdate(nextProps, nextState){
  //   if (searchTerm !== onSearchTermChange) {
  //     return this.state.list!==nextState.list
  //   }
  //  }
  // Render page
  render() {
    return (
      <main>
        <Home />
        <Scrape
          handleSubmit={this.getArtist} 
          artistName = {this.state.artistName}
          {...this.State}
        />
        <footer>
          <div className="player">
            <SpotifyPlayer artistid={this.state.artist.id}/>
          </div>
        </footer>
      </main>
    );
  };

  componentDidMount() {
    this.getSpotifyToken()
    this.getArtist()
    this.callBackendAPI()
    .then(res => this.setState({ data: res.express }))
    .catch(err => console.log(err));
  };

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  updateSearchTerm = searchTerm => {
    this.setState({searchTerm});
  }

  getArtist = async artistName => {
    try {
      if (this.state.token) {
      console.log("this.state.token: ", `${this.state.token}`)
      const response = await axios.get(
        `https://api.spotify.com/v1/search/?q=${artistName}&type=artist`,
        {
          headers: { Authorization: `Bearer ${this.state.token}` },
        }  
      )
      .then(res => {
        const items = res.data.artists.items
        // get the first artist returned from the request
        const firstItem = items[0]
  
        if (!firstItem) {
          alert('surfparrot could not find this artist on Spotify!')
          // <Redirect />
          return
        }
        // get the id of the first artist returned
        this.setState({artist: firstItem})
        this.setState({artistName: firstItem})
        // do something with the artist id
        // https://api.spotify.com/v1/artists/{id}/top-tracks
      })    
    } else {
      this.getSpotifyToken()
    }
 
    } catch (e) {
      // queries the spotify_token endpoint on backend
      this.getSpotifyToken()
      this.getRefreshToken()
    }
  }

  getSpotifyToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/spotify_token')
      const token = response.data.token
      console.log("FRONT END token: ", token)
      this.setState({ token })
    } catch (error) {
      console.log(error)
    }
  }
 
  // helper function sends refresh_token endpoint back to the frontend
  getRefreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/spotify_token')
      const token = response.data.token
      this.setState({ token })
    } catch (error) {
      console.log(error)
    }
  }
}

export default App;
