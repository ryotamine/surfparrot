import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
require('./login.css');
require('./require-login.js');

// Login class
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  _handleCloseLogin = () => {
    this.setState({ show: false });
  }

  _handleOpenLogin = () => {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <button className="main-login" onClick={this._handleOpenLogin} style={{width: 'auto'}}>Login</button>

        <div id="id01" className="popup-login">
          
          <form className="content-login animate" action="/action_page.php">
            <div className="close-login">
              <span onClick={this._handleCloseLogin} className="close">&times;</span>
            </div>

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
      </div>
    );
  }
}

export default Login;
