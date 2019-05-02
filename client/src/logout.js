import React, { Component } from 'react';

// Logout class
class Logout extends Component {


  // Render logout button
  render() {
    return (
      <div>
        <button className='home'><a href='/' className='home' onClick={this.handleLogout}>Logout</a></button>
      </div>
    );
  }

  handleLogout(event) {
    // clear sessionStorage
    sessionStorage.clear();
  }


}

export default Logout;

