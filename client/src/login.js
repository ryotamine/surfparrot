import React, { Component } from 'react';
import Popup from 'reactjs-popup';
require('./login.css');
require('./require-login.js');

// Login class
class Login extends Component {
  // Login constructor
  constructor(props) {
    super(props);

    this.state = { open: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // Open login popup helper function
  openModal () {
    this.setState({ open: true });
  }

  // Close login popup helper function
  closeModal () {
    this.setState({ open: false });
  }

  // Render login popup
  render() {
    return (
      <div>
        <button className="button" onClick={this.openModal}>
          Login
        </button>

        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >

          <div id="id01" className="modal">
            <a className="close" onClick={this.closeModal}>
              &times;
            </a>
          
            <form className="loginForm">

              <div className="info-login">
                <label htmlFor="email"><b>Email</b></label>
                <input className="email-login" type="text" placeholder="Email Address" name="email" required></input>

                <label htmlFor="psw"><b>Password</b></label>
                <input className="password-login" type="password" placeholder="Password" name="psw" required></input>

                <label htmlFor="account"><b>Account Type</b></label><br></br>
                <input className="check-artist" type="checkbox" name="artist" required></input> Artist<br></br>
                <input className="check-user" type="checkbox" name="user" required></input> User<br></br>
                
                <button className="submit-login" type="submit">Login</button>
              </div>
            </form>
          </div>
        </Popup>
      </div>
    );
  }
}

export default Login;
