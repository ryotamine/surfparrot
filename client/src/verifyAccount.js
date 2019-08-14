import React, { Component } from "react";
import "./App.css";

// User verification class
class UserVerification extends Component {
  // User verification classs
  constructor(props) {
    super(props);
    
    this.state = 
    {
      email: this.props.email,
      password: this.props.password
    }

    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
  }

  // Mount component function
  componentDidMount() {
    // Get email and password from form
    // Retrieve passwords from server
    userInfoDB = () => {
      fetch("api/userAccounts")
        .then(res => res.json())
        .then(verify => this.setState({email}), this.setsState({password}));
    }
  }

  // Render user verification
  render() {
    return (
      alert(this.props.email);
    );
  }
}

export default UserVerification;
