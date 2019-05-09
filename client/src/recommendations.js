import React, { Component } from 'react';
import axios from 'axios';
import Scrape from './external-show-listings/scrape-recommendations';
import SpotifyPlayer from './SpotifyPlayer.js';

// User App class
class Recommendations extends Component {
  // User app constructor
  constructor(props) {
    super(props);
  }

  // Initial state
  state = {
    token: null,
    data: null,
    recommendations: "",
    // Artists object that contains 150 artists from spotify endpoints
    artists: [],
    artist: '43ZHCT0cAZBISjO8DG9PnE', 
    searchTerm: ""
  };
  
  // Mount component function
  componentDidMount() {
    this.getRecommendations()
    this.getSpotifyToken()
    this.getArtist()
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  getRecommendations = async artistName => {
    axios.get('http://localhost:5000/user_token', {
      withCredentials: true
    })
      .then (response => {
        const token = response.data.user_token;
        if (token) {
          axios.all([
            axios.get(
              // 50 most recently played tracks
              `https://api.spotify.com/v1/me/player/recently-played`,
              {
                headers: { Authorization: `Bearer ${token}` },
                params: {limit: 50 },
              }  
            ),
            axios.get(
              // 50 artists the user followers
              `https://api.spotify.com/v1/me/following?type=artist`,
              {
                headers: { Authorization: `Bearer ${token}` },
                params: {limit: 50 },
              }  
            ),
            axios.get(
              // 50 of users top played artists
              `	https://api.spotify.com/v1/me/top/artists`,
              {
                headers: { Authorization: `Bearer ${token}` },
                params: {limit: 50 },
              }  
            )
          ])
            .then(axios.spread((recent, following, top) => {
              // Most recently listened to
              const data = recent.data.items;
              const artistArray = data.map(artist => ({
                Artists: artist.track.album.artists
              }));

              // Array of all the artists pulled from different queries
              const artistNames = [];
              for (let i = 0; i < artistArray.length; i++) {
                let item = artistArray[i].Artists;
                for (let j = 0; j < item.length; j++) {
                  artistNames.push(item[j].name)
                }
              }

              const library = following.data.artists.items;
              // Artists user follows
              for (let i = 0; i < library.length; i++) {
                let item = library[i].name;
                artistNames.push(item);
              }

              // Top artists
              const topObject = top.data.items;
                for (let i = 0; i < topObject.length; i++) {
                  let item = topObject[i].name
                  artistNames.push(item)
                }

              //setting to state after running through every endpoint
                //filtering out duplicate artists
              const uniqueValues = artistNames.filter((value, index, self) => self.indexOf(value) === index)

              this.setState({artists: uniqueValues}) 
            }))
          
            } else {
                axios.get('http://localhost:5000/user_refresh_token', {
                    withCredentials: true,
                })
                this.getRefreshToken()
            }
        })
      }
    
    // Render user page
    render() 
                {
        return (
        <div className="spotify">

            <h2>Here are some show recommendations based on artists you listen to on Spotify!</h2>
            <Scrape
            recommendedArtists={this.state.artists}
            handleSubmit={this.getArtist} 
            artistName = {this.state.artistName}
            {...this.State} />


          <footer>
              <div className="player">
                <SpotifyPlayer artistid={this.state.artist}/>
              </div>
          </footer>
        </div>

        );
    }


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
  
    //web player
    getArtist = async artistName => {
      try {
        if (this.state.token) {
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
    
          this.setState({artist: firstItem.id})
          // this.setState({artistName: firstItem})
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

export default Recommendations;
