import React, { Component } from 'react';
import Login from './login';
import Registration from './registration_form';
import Contact from './contact';

class Navbar extends Component {

  render() {
    return (
      <header>
        <div className="logo">
            <img src="/docs/parrot2.png"></img>
        </div>

        <button className='home'><a className='home main-nav' href='/'>surfparrot</a></button>

        <div className="rightnav">
          <ul>
            <li><Login /></li>
            <li><Registration /></li>
            <li><Contact /></li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Navbar;
