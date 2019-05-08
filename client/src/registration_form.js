import React, { Component } from 'react';
import Popup from "reactjs-popup";
// import { withRouter } from 'react-router-dom';

// Register class
class Registration extends Component {
  // Register constructor
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
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
 
  // Open register popup helper function
  openModal () {
    this.setState({ open: true });
  }

  // Close register popup helper function
  closeModal () {
    this.setState({ open: false });
  }

  // Registration form helper function  
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
      register: true
    });
    sessionStorage.setItem('email', this.state.email);

    if (this.state.artist) {
      fetch("/register/artist", {
        method: "POST",
        mode: "cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          'artist': this.state.artist, 
          'firstName': this.state.firstName, 
          'lastName': this.state.lastName, 
          'email': this.state.email, 
          'password': this.state.password 
        }),
      })
      .then(response => 
        response.json()
      ).then(response => {
      })
    }

    if (!this.state.artist) {
      fetch("/register/user", {
        method: "POST", 
        mode: "cors", 
        headers: { "Content-Type": "application/json" },     
        body: JSON.stringify({
          'user': this.state.user, 
          'firstName': this.state.firstName, 
          'lastName': this.state.lastName,
          'email': this.state.email, 
          'password': this.state.password
        }),
      })
      .then(response => 
        response.json()
      ).then(response => {
        console.log("HAVE I REGISTEREDs")
        console.log(response)
      })
    }
  }

  // Handle submit helper function
  // handleSubmit(event) {
  //   event.persist();
  //   const data = {
  //     'firstName': this.firstName.value,
  //     'lastName': this.lastName.value,
  //     'email': this.email.value,
  //     'password': this.password.value
  //     //'accountType': this.accountType.value
  //   }
  //     $.ajax({
  //       type: 'PUT',
  //       // url: 'http://localhost:3000/', How to differentiate between artist and user?
  //       data: data,
  //       crossDomain: true,
  //       success: function(result) {
  //         //console.log('result': result)
  //       },
  //       error: function(err) {alert('invalid info')}
  //     })
  // }

  // Render register popup
  render() {
    // Redirect to artist page per radio button selection
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

          <form className="registrationForm">
            <div className="info-register">
              <label htmlFor="first-name">
                <b>First Name</b>
              </label>
              <input 
                className="first-name-register" 
                type="text" 
                value={this.state.value} 
                onBlur={this.handleChange} 
                placeholder="First Name" 
                id="firstName" 
                ref={node => this.firstName = node} 
                required>
              </input>

              <label htmlFor="last-name">
                <b>Last Name</b>
              </label>
              <input 
                className="last-name-register" 
                type="text" 
                value={this.state.value} 
                onBlur={this.handleChange} 
                placeholder="Last Name" 
                id="lastName" 
                ref={node => this.lastName = node}
                required>
              </input>

              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input 
                className="email-register" 
                type="text" 
                value={this.state.value} 
                onBlur={this.handleChange} 
                placeholder="Email Address" 
                id="email" 
                ref={node => this.email = node}
                required>
              </input>

              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input 
                className="password-register" 
                type="password" 
                value={this.state.value} 
                onBlur={this.handleChange} 
                placeholder="Create a Password" 
                id="password"
                ref={node => this.password = node}
                required></input>

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

              <button className="submit-register" type="submit" value="submit" onClick={this.handleAccountSelection}>Register</button>
            </div>
          </form>
        </div>
      </Popup>
    )
  }
}

export default Registration;
