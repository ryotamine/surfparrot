import React, { Component } from 'react';

// User content class
class UserContent extends Component {
  render() {
    return (
      <div>
        <h1 className="user-upcoming-events">Upcoming Events</h1>

        <li className="event-info">
          <div className="align-event-option">
            <button className="delete-event"><i class="far fa-trash-alt"></i></button>
          </div>
        </li>
      </div>
    );
  }
}

export default UserContent;
