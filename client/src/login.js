import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';

// Login class
class Login extends Component {
  // Login constructor
  constructor(props) {
    super(props);
    this.state = { 
      loggedIn: false,
      loginError: false,
      email: '',
      password: '',
      artist: false,
    };
  }

  handleEmail = (event) => {
    this.setState({email: event.target.value})
  };
  
  handlePassword = (event) => {
    this.setState({password: event.target.value});
  };

  handleSubmit = (event) => {
    // event.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(this.state)
  axios
  .post("/login", loginData, {withCredentials: true})
  .then((res) => {
    this.setState({
      loggedIn: res.data.login,
      loginError: res.data.error
    })
  })
  }
  // Render login popup
  render() {
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
                <input 
                  className="email-login" 
                  type="text" 
                  value={this.state.value} 
                  onChange={this.handleEmail} 
                  placeholder="Email Address"
                  id="email" 
                  name="email" 
                  required>
                </input>
                
                <label htmlFor="psw"><b>Password</b></label>
                <input 
                  className="password-login" 
                  type="password" value={this.state.value} 
                  onChange={this.handlePassword} 
                  placeholder="Password" 
                  name="psw" 
                  required>
                </input>
                
                <input 
                className="check-artist" 
                type="radio" 
                checked={this.state.artist=true} 
                // onChange={this.handleRadioButtonChange} 
                value={"artist"} 
                checked={this.state.artist} 
                id="artist"
                name="accountType"
                required>
              </input> Artist<br></br>

              <input 
                className="check-user" 
                type="radio"
                checked={this.state.artist=false}
                // onChange={this.handleRadioButtonChange} 
                value={"user"}  
                id="user"
                name="accountType"
                required>
              </input> User<br></br>
                
              <button 
                className="submit-login" 
                type="submit" 
                value={this.state.loggedIn=true}>
                <a className="submit-login" href="/">Login</a>
              </button>
              </div>
            </form>
          </div>
        </Popup>
      )
  }
}

export default Login;
