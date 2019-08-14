import React, { Component } from "react";
import Contact from "./contact";
import Registration from "./registration_form";
import Login from "./login";
import LoginRecommendations from "./loginrecommendations";

// Home navbar class
class Navbar extends Component {
  // Register and login constructor
  constructor(props) {
    super(props);

    this.state = {
      openRegistration: false,
      openLogin: false
    };
  }

  // Open login popup helper function
  openLoginModal = () => {
    this.setState({ openLogin: true });
  }

  // Open register popup helper function
  openRegistrationModal = () => {
    this.setState({ openRegistration: true });
  }

  // Close login and register popup helper function
  closeModals = () => {
    this.setState({ 
      openLogin: false,
      openRegistration: false
    });
  }

  // Logout helper function
  handleLogout(event) {
    sessionStorage.clear();
  }

  // Render home navbar
  render() {
    return (
      <header>
        <div className="logo">
          <img src="/docs/parrot2.png" alt=""></img>
        </div>
        
        <button className="home"><a className="home main-nav" href="/">surfparrot</a></button>

        <div className="rightnav">
          <ul>
            <li className="recommend"><LoginRecommendations /></li>
            <li><Contact /></li>

            <div className="dropdown">
              <button className="dropbtn main-nav">
                my account
                <i className="fa fa-caret-down"></i>
              </button>

              <div className="dropdown-content">
                <div className="main-register main-nav" onClick={this.openRegistrationModal}>
                  Register 
                </div>
                <div className="main-login main-nav" onClick={this.openLoginModal}>
                  Login
                </div>
              </div>
            </div>
          </ul>
        </div>
        
        { this.state.openRegistration && <Registration closeModal={this.closeModals}/>}
        { this.state.openLogin && <Login setUser={this.props.setUser} closeModal={this.closeModals}/> }
      </header>
    );
  }
}

export default Navbar;
