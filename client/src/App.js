import React, { Component } from 'react';
import Home from './home';
import Login from './login';
import Register from './register';
import Contact from './contact';
import Scrape from './external-show-listings/scrape';
import SpotifyPlayer from './SpotifyPlayer';

// App class
class App extends Component {
  render() {
    return (
      
      <div>
        <Home />
        <Login />
        <Register />
        <Contact />
        <Scrape />
        {/* this.state.artistid */}
        <SpotifyPlayer artistid="0Z8fvErw8r7KKFjYAWDd0a"/>
      </div>
      

    );
  }
}
export default App;
