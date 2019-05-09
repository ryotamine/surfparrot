import React, { Component } from 'react';

// Get show recommendations class
class LoginRecommendations extends Component {
  // Get show recommendations constructor
  constructor(props) {
    super(props);
  }

  // Initial Spotify token state
  state = {
    token: null
  }

  // Render get show recommendations
  render() {
    return (
      <a href="http://localhost:5000/login-recommendations">
        get show recommendations!
      </a>
    )
  }
}

export default LoginRecommendations;
