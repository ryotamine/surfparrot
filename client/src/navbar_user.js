import React, { Component } from 'react';
import Logout from './logout';
import Contact from './contact';
import FindEvent from './find_event';

// User nav bar class
class UserNavbar extends Component {
  render() {
    return (
      <header>
        <div className="logo">
          <img src="/docs/parrot2.png"></img>
        </div>

        <button className='home'>
          <a className='home main-nav' href='/user'>surfparrot</a>
        </button>

        <div className="rightnav">
          <ul>
            <li><Logout /></li>
            <li><FindEvent /></li>
            <li><Contact /></li>
          </ul>
        </div>
      </header>
    );
  }
}

export default UserNavbar;
