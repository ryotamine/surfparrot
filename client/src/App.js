import React, { Component } from 'react';
import axios from 'axios';
import Home from './home';
import Scrape from './external-show-listings/scrape';
import SpotifyPlayer from './SpotifyPlayer.js';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

// App class
class App extends Component {
  // App constructor


  setUser = (user) => {
    console.log("TESTSETST  ")
    console.log(user.user_id)
    this.setState({user: user.user_id})
  }
  
  

  // Render page
  render () {
    // Redirect to artist page per radio button selection
    
    if (this.props.user) {
      return (
        <Redirect to={`/artists/${this.props.user}`} />
      )
    } else {
      return (
        <main>
          {/* <Home setUser={this.setUser}/>
          USER IS {this.state.user} */}
          <Scrape 
            handleSubmit={this.props.handleSubmit} 
  
          />
          <footer>
            {
              this.props.artist && (
                <div className="player">
                  <SpotifyPlayer artistid={this.props.artist}/>
                </div>
              )
            }
          </footer>
        </main>
      )
    }
  }
}
export default App;
