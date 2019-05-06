import React, { Component } from 'react';
import Contact from './contact';
import SignedInAs from './signed_in_as';

class NavbarUser extends Component {
  // Logout helper function
  handleLogout(event) {
    sessionStorage.clear();
  }

  // Render user navbar
  render() {
    return (
      <header>
        <div className="logo">
            <img src="/docs/parrot2.png" alt=""></img>
        </div>

        <button className='home'><a className='home main-nav' href='/'>surfparrot</a></button>

        <div className="rightnav">
          <ul>
            <li><SignedInAs /></li>
            <li><Contact /></li>

            <div className="dropdown">
              <button className="dropbtn main-nav">
                 my account
                <i className="fa fa-caret-down"></i>
              </button>

              <div className="dropdown-content">
                <button className='main-logout main-nav'>
                  <a href='/' 
                    className='main-logout main-nav' 
                    onClick={this.handleLogout}>
                    Logout
                  </a>
                </button>
              </div>
            </div>
          </ul>
        </div>
      </header>
    );
  }
}

export default NavbarUser;
