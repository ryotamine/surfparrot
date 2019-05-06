import React, { Component } from 'react';
import axios from 'axios';
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
                axios.get(
                  `https://api.spotify.com/v1/me/player/recently-played`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {limit: 50 },
                  }  
                )
                .then(res => {
                  const data = res.data.items;
                  const artistArray = data.map(artist => ({
                    Artists: artist.track.album.artists
                  }));
                  const artistNames = [] 
                  this.setState({artists: artistNames}) 
                    for (let i = 0; i < artistArray.length; i++) {
                        let item = artistArray[i].Artists;
                        for (let j = 0; j < item.length; j++) {
                            artistNames.push(item[j].name)
                            console.log("~~~~~~~~~~~~names", item[j].name)
                            // console.log(artistNames)
                        }
                    }
                  // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~res.data", res.data)
                  console.log("~~~~~~~artistNames", artistNames)
                })
                
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
