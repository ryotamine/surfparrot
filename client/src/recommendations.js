import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import Scrape from './external-show-listings/scrape-recommendations';
import SpotifyPlayer from './SpotifyPlayer.js';



// User App class
class Recommendations extends Component {
    constructor(props) {
    super(props);
    }
        state = {
            token: null,
            data: null,
            recommendations: "",
            //artists object that contains 150 artists from spotify endpoints
            //not sure if its saving to state properly?
            artists: [],
            artist: '43ZHCT0cAZBISjO8DG9PnE', 
            searchTerm: "",
        };
    
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
            withCredentials: true,
        })
        .then (response => {
            const token = response.data.user_token
            console.log("FRONT END token: ", token)
            if (token) {
                console.log("this.state.token: ", token)
                axios.all([
                  axios.get(
                    //50 most recently played tracks
                    `https://api.spotify.com/v1/me/player/recently-played`,
                    {
                      headers: { Authorization: `Bearer ${token}` },
                      params: {limit: 50 },
                    }  
                  ),
                  axios.get(
                    //50 artists the user followers
                    `https://api.spotify.com/v1/me/following?type=artist`,
                    {
                      headers: { Authorization: `Bearer ${token}` },
                      params: {limit: 50 },
                    }  
                  ),
                  axios.get(
                    //50 of users top played artists
                    `	https://api.spotify.com/v1/me/top/artists`,
                    {
                      headers: { Authorization: `Bearer ${token}` },
                      params: {limit: 50 },
                    }  
                  )
                ])
                .then(axios.spread((recent, following, top) => {
                  //most recently listened to
                  const data = recent.data.items;
                  const artistArray = data.map(artist => ({
                    Artists: artist.track.album.artists
                  }));

                  //array of all the artists pulled from different queries
                  const artistNames = [] 

                  console.log("~~~~~~~~~~artistNames", artistNames)
                    for (let i = 0; i < artistArray.length; i++) {
                        let item = artistArray[i].Artists;
                        for (let j = 0; j < item.length; j++) {
                            artistNames.push(item[j].name)
                            console.log("~~~~~~~~~~~~names", item[j].name)
                        }
                    }
                  console.log("~~~~~~~artistNames", artistNames)
                  const library = following.data.artists.items;
                  //artists user follows
                  console.log("~~~~~~~~~library", library)
                    for (let i = 0; i < library.length; i++ ) {
                      let item = library[i].name
                      artistNames.push(item)
                      console.log("~~~~~~~item", item)
                    }
                  //top artists
                  const topObject = top.data.items
                  console.log("~~~~~topObject", topObject)
                    for (let i = 0; i < topObject.length; i++ ) {
                      let item = topObject[i].name
                      artistNames.push(item)
                      console.log("~~~~~~~top artists", topObject[i].name)
                    }

                  //setting to state after running through every endpoint
                   //filtering out duplicate artists
                  const uniqueValues = artistNames.filter((value, index, self) => self.indexOf(value) === index)

                  this.setState({artists: uniqueValues}) 
                  console.log("~~~~~~~~~~this.state.artists", this.state.artists)
                }))
              
            } else {
                axios.get('http://localhost:5000/user_refresh_token', {
                    withCredentials: true,
                })
                this.getRefreshToken()
            }
        })
        console.log("this.state.artists~~~~~~~~", this.state.artists)
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
                <SpotifyPlayer artistid={this.state.artist.id}/>
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

export default Recommendations;
