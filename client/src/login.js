import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { withRouter } from 'react-router-dom';

// Login class
class Login extends Component {
  // Login constructor
  constructor(props) {
    super(props);

    this.state = { 
      email: '',
      password: '',
      artist: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAccountSelection = this.handleAccountSelection.bind(this);
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
  }

  // Open login popup helper function
  openModal () {
    this.setState({ open: true });
  }

  // Close login popup helper function
  closeModal () {
    this.setState({ open: false });
  }

  // Login form helper function  
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // Radio button change helper function
  handleRadioButtonChange(event) {
    event.persist();
    this.setState({ artist: event.target.id === 'artist' });
  }

  // Artist or user selection helper function
  handleAccountSelection(event) {
    event.preventDefault();
    this.setState({
      login: true
    });
    sessionStorage.setItem('email', this.state.email);

    if (this.state.artist) {
      fetch("/login/artist", {
        method: "POST",
        mode: "cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          'artist': this.state.artist, 
          'email': this.state.email, 
          'password': this.state.password 
        }),
      })
      .then(response => 
        response.json()
      ).then(response => {
        console.log("Artist", this.props.history, response)
        this.props.history.push(response.url3)
      })
    }

    if (!this.state.artist) {
      fetch("/login/user", {
        method: "POST", 
        mode: "cors", 
        headers: { "Content-Type": "application/json" },     
        body: JSON.stringify({
          'user': this.state.user,
          'email': this.state.email, 
          'password': this.state.password
        }),
      })
      .then(response => 
        response.json()
      ).then(response => {
        console.log("User", this.props.history, response)
        this.props.history.push(response.url4)
      })
    }
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
          <a className="close" onClick={this.props.closeModal}>
            &times;
          </a>
        
          <form className="loginForm">
            <div className="info-login">
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input 
                className="email-login" 
                type="text" 
                value={this.state.value} 
                onBlur={this.handleChange} 
                placeholder="Email Address" 
                id="email" 
                required>
              </input>

              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input 
                className="password-login" 
                type="password" 
                value={this.state.value} 
                onBlur={this.handleChange} 
                placeholder="Password" 
                id="password" 
                required>
              </input>

              <label htmlFor="account"><b>Account Type</b></label><br></br>

              <input 
                className="check-artist" 
                type="radio" 
                checked={this.state.artist} 
                onChange={this.handleRadioButtonChange} 
                value={"artist"} 
                checked={this.state.artist} 
                id="artist"
                name="accountType"
                required>
              </input> Artist<br></br>

              <input 
                className="check-user" 
                type="radio"
                checked={this.state.user}
                onChange={this.handleRadioButtonChange} 
                value={"user"}  
                id="user"
                name="accountType"
                required>
              </input> User<br></br>

              <button className="submit-login" type="submit" value="submit" onClick={this.handleAccountSelection}>Login</button>
            </div>
          </form>
        </div>
      </Popup>
    );
  }
}

export default withRouter(Login);
