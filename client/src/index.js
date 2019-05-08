import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import UserApp from './user_app';
import ArtistApp from './artist_app';
import Recommendations from './recommendations.js';
import Home from './home';
import axios from 'axios';
import NavbarArtist from './navbar_artist';

class Index extends Component {

  constructor(props) {
    super(props);
    this.getArtist = this.getArtist.bind(this);
  }
  
  state = {
    token: null,
    artist: '43ZHCT0cAZBISjO8DG9PnE',
    searchTerm: "",
    artistName: "",
    data: null,
    loading: true,
    user: 0
  };
 
setUser = (user) => {
  console.log("TESTSETST  ")
  console.log(user.user_id)
  this.setState({user: user.user_id})
}

componentDidMount() {    
  this.getSpotifyToken()
  this.getArtist()
  this.getUser()
};

getUser = async () => {
  if (sessionStorage.email) {
    axios("/login/account", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        'email': sessionStorage.email,
      }),
    })
    .then(response => 
      response.json()
    ).then(response => {
      this.props.history.push(response.url3)
    })
  }
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
      console.log(" IM GETTING THE ARTSIT NOW")
      console.log(firstItem)
      this.setState({artist: firstItem.id})
      // this.setState({artistName: firstItem})

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

 render() {
   console.log(this.state.artist)
   return (
    <div>
    {
    this.state.user > 0 ? <NavbarArtist /> : <Home setUser={this.setUser}/>
    }
    <Router>
      <div>
        <Route exact path="/" component={() => <App user={this.state.user}  handleSubmit={this.getArtist} artistName = {this.state.artistName} artist={this.state.artist}/>} />
        <Route exact path="/users/:id" component={UserApp} />
        <Route exact path="/artists/:id" component={() => <ArtistApp id={this.state.user}/>} />
        <Route exact path="/recommendations" component={Recommendations} />
      </div>
    </Router>
  </div>
   )
 }
}

ReactDOM.render(<Index />, document.getElementById('root'));
