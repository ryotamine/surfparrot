import React, { Component } from 'react';

// User content class
class UserContent extends Component {
  // User content constructor
  constructor(props) {
    super(props);

    this.state = { 
      data: [{eventName: ""}]
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  // Delete event helper function
  handleDelete(event) {
    const data = this.state.data.filter(i => i.eventName !== event.eventName)
    this.setState({data});
  }

  // Render user content
  render() {
    const events = this.state.data.map((event) => {
      return (
        <div key={event.eventName}>
          <li className="event-info">
            <div className="align-event-option">
              <button className="delete-event" onClick={this.handleDelete.bind(this, event)}>
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </li>
        </div>
      );
    });

    return (
      <div>
        <h1 className="user-upcoming-events">Upcoming Events</h1>
        {events}
      </div>
    );
  }
}

export default UserContent;
