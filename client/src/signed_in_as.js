import React, { Component } from 'react';

// User signed in as class
class SignedInAs extends Component {

  render() {
    let email = sessionStorage.getItem('email');

    return (
      <div>
        <h3 className="signed-email">Signed In As: {email} </h3>
      </div>
    );
  }
}

export default SignedInAs;
