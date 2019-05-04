import React, { Component } from 'react';
import Popup from 'reactjs-popup';

// Login class
class Login extends Component {
  // Login constructor
  constructor(props) {
    super(props);

    this.state = { 
      email: '',
      password: '',
      artist: false,
    };
  }

  // Render login popup
  render() {
    // // Redirect to artist page per radio button selection
    // if (this.state.artist && this.state.register) {
    //   return <Redirect to="/artist"/>
    // }
  
    // // Redirect to user page per radio button selection
    // if (!this.state.artist && this.state.register) { 
    //   return <Redirect to="/user"/>
    // }

    return (
        <Popup
          open={true}
          closeOnDocumentClick
          onClose={this.props.closeModal}
        >
          <div id="id02" className="modal">
            <a href className="close" onClick={this.props.closeModal}>
              &times;
            </a>
          
            <form onSubmit={this.handleSubmit} className="login-form">
              <div className="info-login">
                <label htmlFor="email"><b>Email</b></label>
                <input className="email-login" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Email Address" name="email" required></input>

                <label htmlFor="psw"><b>Password</b></label>
                <input className="password-login" type="password" value={this.state.value} onChange={this.handleChange} placeholder="Password" name="psw" required></input>

                <button className="submit-login" type="submit" value="submit"><a className="submit-login" href="/user">Login</a></button>
              </div>
            </form>
          </div>
        </Popup>
    );
  }
}


export default Login;
