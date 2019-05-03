import React, { Component } from 'react';

// User signed in as class
class SignedInAs extends Component {

  render() {
    let email = sessionStorage.getItem('email');

    return (
      <div>
        <h1 className="signed-email">Signed In As: {email} </h1>
      </div>
    );
  }
}


export default SignedInAs;
