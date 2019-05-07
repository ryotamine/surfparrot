import React, { Component } from 'react';
import './App.css';
import Login from 'login';
import { Verify } from 'crypto';

class UserVerification extends Component {
  constructor(props) {

    super(props);
    
    this.state = 
    {
      email: this.props.email,
      password: this.props.password,
    }
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    console.log("account verify state", this.state)
  }

  componentDidMount() {
    //get email and password from form
    //retrieve passwords from server
    userInfoDB = () => {
      fetch('api/userAccounts')
      .then(res => res.json())
      .then(verify => this.setState({email}), this.setsState({password}))
    }
  }
  render() {
    return (
      alert(this.props.email)
    )
  }
}
export default UserVerification