import React, { Component } from 'react';
import Popup from 'reactjs-popup';

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
        <button className="main-login" onClick={this.openModal}>
          Login
        </button>

        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div id="id02" className="modal">
            <a href className="close" onClick={this.closeModal}>
              &times;
            </a>
          
            <form onSubmit={this.handleSubmit} className="login-form">
              <div className="info-login">
                <label htmlFor="email"><b>Email</b></label>
                <input className="email-login" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Email Address" name="email" required></input>

                <label htmlFor="psw"><b>Password</b></label>
                <input className="password-login" type="password" value={this.state.value} onChange={this.handleChange} placeholder="Password" name="psw" required></input>

                <label htmlFor="account"><b>Account Type</b></label><br></br>
                <input className="check-artist" type="checkbox" name="artist" required></input> Artist<br></br>
                <input className="check-user" type="checkbox" name="user" required></input> User<br></br>
                
                <button className="submit-login" type="submit" value="submit"><a className="submit-login" href="/user">Login</a></button>
              </div>
            </form>
          </div>
        </Popup>
      </div>
    );
  }
}

export default Login;
