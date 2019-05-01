import React, { Component } from 'react';
import Navbar from './navbar';

// Home class
class Home extends Component {
  render() {
    return (
      <main>
        <button className='home'><a className='home' href='/'>surfparrot</a></button>
        <Navbar />
      </main>
    );
  }
}

export default Home;
