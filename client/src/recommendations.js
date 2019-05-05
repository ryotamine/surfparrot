import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar';


// User App class
class Recommendations extends Component {
    constructor(props) {
    super(props);
    }
        state = {
            token: null,
            artistNames: "",
        };
    
    // componentDidMount() {
        
    // }
    

  // Render user page
  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

export default Recommendations;
