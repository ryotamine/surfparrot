import React, { Component } from 'react';

// User content class
class UserContent extends Component {
  render() {
    return (
      <div>
        <h1>Upcoming Events</h1>
        <h1>Find More Events</h1>
        <button className="main-event-form">
          <a className="plus" href="/"><i className="fas fa-plus-circle fa-4x"></i></a>
        </button>
      </div>
    );
  }
}

export default UserContent;
