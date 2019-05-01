import React, { Component } from 'react';
import Popup from "reactjs-popup";


class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = { open: false}
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

  }
   
  openModal () {
    this.setState({ open: true })
  }
  closeModal () {
    this.setState({ open: false })
  }

  
    

  //   this.state = {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: ''
  //   };
    
  // handleChange(event) {
  //   this.setState({
  //     firstName: event.target.value,
  //     lastName: event.target.value,
  //     email: event.target.value,
  //     password: event.target.value
  //   })
  // }
  // handleSubmit(event) {
  //   alert('User Form Submitted: ' + this.state.value);
  //   event.preventDefault();
  // }

  render() {
    return (
      <div>
        <button className="main-register main-nav" onClick={this.openModal}>
          Register 
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
          <form onSubmit={this.handleSubmit} className="registrationForm">
          
            <div className="info-register">
              <label htmlFor="first-name"><b>First Name</b></label>
              <input className="first-name-register" type="text" value={this.state.value} onChange={this.handleChange} placeholder="First Name" name="first-name" required></input>

              <label htmlFor="last-name"><b>Last Name</b></label>
              <input className="last-name-register" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Last Name" name="last-name" required></input>

              <label htmlFor="email"><b>Email</b></label>
              <input className="email-register" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Email Address" name="email" required></input>

              <label htmlFor="psw"><b>Password</b></label>
              <input className="password-register" type="password" value={this.state.value} onChange={this.handleChange} placeholder="Create a Password" name="psw" required></input>
              <button className="submit-register" type="submit" value="submit">Register</button>
            </div>
          </form>
        </div>
        </Popup>
      </div>
    )
  }
}

export default Registration;
