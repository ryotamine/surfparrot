import React, { Component } from 'react';
import Home from './home';
import UserSignedInAs from './user_signed_in_as';
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
        <UserSignedInAs />
        <Logout />
        <Contact />
        <UserContent />
      </div>
    );
  }
}

export default UserApp;
