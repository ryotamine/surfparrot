import React, { Component } from "react";

// User signed in as class
class SignedInAs extends Component {

  // Render signed in as
  render() {
    let email = sessionStorage.getItem("email");

    return (
      <div>
        <h3 className="signed-email">signed in as: {email} </h3>
      </div>
    );
  }
}

export default SignedInAs;
