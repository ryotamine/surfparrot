import React, { Component } from 'react';
import Login from './login';
import Registration from './registration_form';
import Contact from './contact';

class Navbar extends Component {

  // Register & Login constructor
  constructor(props) {
    super(props);

    this.state = { 
      openLogin: false,
      openRegistration: false,
    };
  }

  // Open login & register popup helper function
  openLoginModal = () => {
    this.setState({ openLogin: true });
  }

  openRegistrationModal = () => {
    this.setState({ openRegistration: true });
  }

  // Close login & register popup helper function
  closeModals = () => {
    this.setState({ 
      openLogin: false,
      openRegistration: false
     });
  }

  handleLogout(event) {
    // clear sessionStorage
    sessionStorage.clear();
  }

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
              <button className="dropbtn main-nav">
                 my account
                <i className="fa fa-caret-down"></i>
              </button>

              <div className="dropdown-content">
                <button className="main-register main-nav" onClick={this.openRegistrationModal}>
                  Register 
                </button>
                <button className="main-login main-nav" onClick={this.openLoginModal}>
                  Login
                </button>
                <button className='main-logout main-nav'><a href='/' className='main-logout main-nav' onClick={this.handleLogout}>
                  Logout</a>
                </button>
    
              </div>
            </div>

          </ul>
        </div>
        { this.state.openRegistration && <Registration closeModal={this.closeModals}/>}

        { this.state.openLogin && <Login closeModal={this.closeModals}/> }
      </header>
    );
  }


}

export default Navbar;
