import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import UserApp from "./user_app";
import ArtistApp from "./artist_app";
import Recommendations from "./recommendations.js";
import Home from "./home";
import axios from "axios";
import NavbarArtist from "./navbar_artist";

// Index class
class Index extends Component {
  // Set initial state
  state = {
    token: null,
    artist: "43ZHCT0cAZBISjO8DG9PnE",
    searchTerm: "",
    artistName: "",
    data: null,
    loading: true,
    user: 0
  }
 
  // Set artist function
  setUser = (user) => {
    this.setState({user: user.user_id});
  }

  // Get artist function
  getUser = async () => {
    if (sessionStorage.email) {
      axios("/login/account", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "email": sessionStorage.email
        })
      })
      .then(response => 
        response.json()
      ).then(response => {
        this.props.history.push(response.url3);
      })
    }
  }

  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  updateSearchTerm = searchTerm => {
    this.setState({searchTerm});
  }

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
          const items = res.data.artists.items;
          // Get the first artist returned from the request
          const firstItem = items[0];

          if (!firstItem) {
            alert("surfparrot could not find this artist on Spotify!");
            return
          }

          // Get the id of the first artist returned
          this.setState({artist: firstItem.id});
        })  
      } else {
        this.getSpotifyToken();
      }
    } catch (e) {
      // Queries the Spotify token endpoint on back-end
      this.getSpotifyToken();
      this.getRefreshToken();
    }
  }

  getSpotifyToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/spotify_token");
      const token = response.data.token;
      this.setState({ token });
    } catch (error) {
      console.log(error);
    }
  }

  // Helper function sends refresh token endpoint back to the front-end
  getRefreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/spotify_token");
      const token = response.data.token;
      this.setState({ token });
    } catch (error) {
      console.log(error);
    }
  }

  // Mount artist and Spotify token function
  componentDidMount() {    
    this.getSpotifyToken();
    this.getArtist();
    this.getUser();
  }

  // Render pages
  render() {
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
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));
