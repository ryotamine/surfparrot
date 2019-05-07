import React, { Component } from 'react';
import axios from 'axios';
import App from './App.js';
import Navbar from './navbar';



// User App class
class Recommendations extends Component {
    constructor(props) {
    super(props);
    }
        state = {
            token: null,
            data: null,
            recommendations: "",
            artists: []
        };
    
    componentDidMount() {
        this.getRecommendations()
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
                  //is this setting it to state properly?
                  this.setState({artists: artistNames}) 
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
        <div>
            <Navbar />
            {this.state.artists}
        
        </div>

        );
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
