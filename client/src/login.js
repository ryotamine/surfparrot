import React, { Component } from 'react';

// Login class
class Login extends Component {
  // Login constructor
  constructor(props) {
    super(props);

    this.state = { 
      openLogin: '',
      closeLogin: ''
    };
  }
  
  // Open login helper function
  _handleOpenLogin = (e) => {
    e.preventDefault();
    let openLogin = e.target.value;
    this.setState({ openLogin });
  }

  // Close login helper function
  _handleCloseLogin = (e) => {
    e.preventDefault();
    let closeLogin = e.target.value;
    this.setState({ closeLogin });
  }

  // Render login popup
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
                
              <button className="submit-login" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
