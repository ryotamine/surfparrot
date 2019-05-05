import React, { Component } from 'react';

// Artist content class
class ArtistContent extends Component {
  // Artist content constructor
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

  // Render artist content
  render() {
    const events = this.state.data.map((event) => {
      return (
        <div key={event.eventName}>
          <li className="event-info">
            <div className="align-event-option">
              <button className="edit-event">
                <i class="fas fa-edit"></i>
              </button>
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
        <h1 className="artist-my-events">My Events</h1>
        {events}
      </div>
    );
  }
}

export default ArtistContent;
