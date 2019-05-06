import React, { Component } from 'react';
import EventCreation from './event_form'; 

// Artist content class
class ArtistContent extends Component {
  // Artist content constructor
  constructor(props) {
    super(props);

    this.state = { 
      eventName: "John",
      data: [{name: ""}]
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // Edit event helper function
  handleEdit(event) {
    this.setState({eventName: event});
  }

  // Delete event helper function
  handleDelete(event) {
    const data = this.state.data.filter(i => i.name !== event.name)
    this.setState({data});
  }

  // Render artist content
  render() {
    const events = this.state.data.map((event) => {
      return (
        <div key={event.name}>
          <li className="event-info">
            <div className="align-event-option">
              <a className="name-event">
                {this.props.name}
              </a>
              <button 
                className="edit-event" 
                onClick={this.handleEdit.bind(this, event)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button 
                className="delete-event" 
                onClick={this.handleDelete.bind(this, event)}
              >
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
          </li>
        </div>
      );
    });

    return (
      <div>
        <h1 className="artist-my-events">my events</h1>
        {events}
      </div>
    );
  }
}

export default ArtistContent;
