import React, { Component } from 'react';

// App className
class Registration extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      firstName: event.target.value,
      lastName: event.target.value,
      email: event.target.value,
      password: event.target.value
    })
  }
  handleSubmit(event) {
    alert('User Form Submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <button className="main-register" onClick={document.getElementById('id02')} style={{width:'auto'}}> Register </button>
      <div id="id02" className="popup-register">
        <form onSubmit={this.handleSubmit} className="content-register animate">
          <div className="close-register">
            <span onClick={document.getElementById('id02')} className="close">&times;</span>
          </div>

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
      </div>
    )
  }
}
export default Registration
