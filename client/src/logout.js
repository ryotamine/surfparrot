import React, { Component } from 'react';

// Logout class
class Logout extends Component {
  // Render logout button
  render() {
    return (
      <div>
        <button className='home'><a className='home' onClick={this.handleAccountSelection} href='/'>Logout</a></button>
      </div>
    );
  }
}



export default Logout;
