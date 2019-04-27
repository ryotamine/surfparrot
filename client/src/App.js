import React, { Component } from 'react';
import Home from './home';
import Login from './login';
import Register from './register';
import Contact from './contact';
import Scrape from './external-show-listings/scrape';

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
      </div>

      
      

    );
  }
}
export default App;
