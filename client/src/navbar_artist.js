import React, { Component } from 'react';
import Logout from './logout';
import Contact from './contact';
import EventCreation from './event_form';

// Artist nav bar class
class ArtistNavbar extends Component {
  render() {
    return (
      <header>
        <div className="logo">
          <img src="/docs/parrot2.png"></img>
        </div>

        <button className='home'>
          <a className='home main-nav' href='/artist'>surfparrot</a>
        </button>

        <div className="rightnav">
          <ul>
            <li><Logout /></li>
            <li><EventCreation /></li>
            <li><Contact /></li>
          </ul>
        </div>
      </header>
    );
  }
}

export default ArtistNavbar;
