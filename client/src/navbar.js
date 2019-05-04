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
            <li><Contact /></li>

            <div className="dropdown">
              <button className="dropbtn">
                 my account
                <i class="fa fa-caret-down"></i>
                <div className="dropdown-content">
                  <Registration />
                  <Login />
                </div>
              </button>
            </div>

          </ul>
        </div>
      </header>
    );
  }
}

export default Navbar;
