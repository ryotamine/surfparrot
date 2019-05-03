import React, { Component } from 'react';
import UserNavbar from './navbar_user';
import SignedInAs from './signed_in_as';
import UserContent from './user_content';

// User App class
class UserApp extends Component {

  // Render user page
  render() {
    return (
      <div>
        <UserNavbar />
        <SignedInAs />
        <UserContent />
      </div>
    );
  }
}

export default UserApp;
