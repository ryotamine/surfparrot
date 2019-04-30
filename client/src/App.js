import React, { Component } from 'react';
import Home from './home';
import Login from './login.js';
import Scrape from './external-show-listings/scrape';
import Registration from './registration_form.js';
<<<<<<< HEAD
import axios from 'axios';
import SpotifyPlayer from './SpotifyPlayer.js';
=======
import EventCreation from './event_form';

>>>>>>> afb0f4a03a272d4d4f8158b438f60a0bdbb3dc1a

// App class
class App extends Component {
  state = {
    token: null,
  }

  componentDidMount() {
    this.getSpotifyToken()
  }


  render() {
    return (
      <div>
        <Home />
        {/* <Login /> */}
        <Scrape />
        {/* this.state.artistid */}
        <SpotifyPlayer artistid="0Z8fvErw8r7KKFjYAWDd0a"/>
      <br />
        <Registration />
        <Login />
        <button onClick={() => this.getArtist('esther')}>get artist</button>
        <EventCreation />

      </div>
    );
  }

  getArtist = async artistName => {
    try {
      if (this.state.token) {
      console.log("this.state.token: ", `${this.state.token}`)
      const response = await axios.get(
        `https://api.spotify.com/v1/search/?q=name:${artistName}&type=artist`,
        {
          headers: { Authorization: `Bearer ${this.state.token}` },
        }  
      )
      .then(getArtist => {
        // console.log(getArtist)
        console.log(`this.${artistName}`) 
        const items = response.data.artists.items
        // get the first artist returned from the request
        const firstItem = items.find(({ id }) => !!id)
  
        if (!firstItem) {
          console.log('no artists found')
          return
        }
        const id = firstItem.id 
        // get the id of the first artist returned
        // do something with the atist id
        // https://api.spotify.com/v1/artists/{id}/top-tracks
      })    
    } else {
      this.getSpotifyToken()
      // console.log("getSpotifyToken: ", this.getSpotifyToken())
      // this.getRefreshToken()
      // console.log("getRefreshToken: ", this.getRefreshToken())
   
    }
      
      // .catch(err => {
      //    // queries the spotify_token endpoint on backend
      //   this.getSpotifyToken()
      //   console.log("getSpotifyToken: ", this.getSpotifyToken())
      //   this.getRefreshToken()
      //   console.log("getRefreshToken: ", this.getRefreshToken())
      // });

    
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
 
  // helper function sends spotify_token endpoint back to the frontend
  // getSpotifyToken = () => {
  //   axios.get('http://localhost:5000/spotify_token')
  //   .then(function (response) {
  //     const token = response.data.token
  //     // debugger
  //     console.log("FRONT ENDtoken: ", token)
  //     this.setState({ token })
  //     console.log(response);
  //   })

    // try {
    //   axios.get('http://localhost:5000/spotify_token').then(function (response) { 
    //     debugger
    //     // handle success
    //     const token = response.data.token
    //     console.log("token: ", token)
    //     this.setState({ token })
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     debugger
    //     // handle error
    //     console.log(error);
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
  

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
