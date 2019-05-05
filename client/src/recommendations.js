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
                  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~res.data", res.data)
                })
            } 
        })
      }
    

    // Render user page
    render() {
        return (
        <div>
            <Navbar />


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
