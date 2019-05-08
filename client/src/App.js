import React, { Component } from 'react';
import Scrape from './external-show-listings/scrape';
import SpotifyPlayer from './SpotifyPlayer';
import { Redirect } from 'react-router';

// App class
class App extends Component {
  // Set artist function
  setUser = (user) => {
    this.setState({ user: user.user_id });
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
          <Scrape handleSubmit={this.props.handleSubmit}/>
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
