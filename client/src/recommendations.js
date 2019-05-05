import React, { Component } from 'react';

class Recommendations extends Component {

  constructor(props) {
  super(props);
  }
    state = {
      token: null,
    };

  render() {
    return (
        <a href="http://localhost:5000/login-recommendations">
          get show recommendations!
        </a>
        
    )
  }
}


export default Recommendations;