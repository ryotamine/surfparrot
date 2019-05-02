import React, { Component } from 'react';
import Home from './home';
import SignedInAs from './signed_in_as';
import Logout from './logout';
import Contact from './contact';
import UserContent from './user_content';

// User App class
class UserApp extends Component {

  // Render user page
  render() {
    return (
      <div>
        <Home />
        <SignedInAs />
        <UserContent />
        <Logout />
      </div>
    );
  }
}

export default UserApp;
