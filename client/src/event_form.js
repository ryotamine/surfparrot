import React, { Component } from 'react';
import Popup from "reactjs-popup";
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'

// Create event form class
class Eventform extends Component {
  // Create event form constructor
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      eventName: '',
      eventDate: '',
      eventLocation: '',
      songLink: '',
      date: new Date()
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSaveEvent = this.handleSaveEvent.bind(this);
  }
  
  // Change event form helper function
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  // Save event form helper function
  handleSaveEvent(event) {
    event.preventDefault();
    fetch('/saveEvent', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          'eventName': this.state.eventName, 
          'eventDate' : this.state.eventDate, 
          'eventLocation': this.state.eventLocation, 
          'songLink': this.state.songLink 
        }
      ), 
    })
    .then()
    .then(response => {
      response.json()
    });
  }

  // Render event form
  render() {
    const { date } = this.state;
    return (
      <Popup
        open={this.props.event}
        closeOnDocumentClick
        onClose={this.props.closeModal}
        >
        <div id="id02" className="modal">
          <a href className="close" onClick={this.props.closeModal}>
          &times;
          </a>
          <form onSubmit={this.handleSubmit} className="registrationForm">
        
            <div className="info-event">
              <label htmlFor="event-name" className="event-name"><b>Event Name</b></label>
              <input 
                className="event-name-create" 
                type="text" value={this.state.value} 
                onBlur={this.handleChange} 
                placeholder="Event Name" 
                name="event-name-create" 
                id="eventName" 
                ref={this.props.eventName} 
                required>
              </input>

              <label htmlFor="Date" className="event-date"><b>Date</b></label>
              <input
                className="event-date-create" 
                type="text" 
                value={this.state.value} 
                onBlur={this.handleChange} 
                placeholder="Date" 
                name="event-date"
                id="eventDate" 
                ref={node => this.eventDate = node} 
                required>
              </input>

              <label htmlFor="Location" className="event-location"><b>Location</b></label>
              <input 
                className="event-location-create" 
                type="text" 
                value={this.state.value} 
                onBlur={this.handleChange} 
                placeholder="Add Location" 
                name="event-location"  
                id="eventLocation" 
                ref={node => this.eventLocation = node}
                required>
              </input>
              
              <label htmlFor="song-link" className="event-song"><b>Link a Song!</b></label>
              <input 
                className="event-songlink-create" 
                type="text" 
                value={this.state.value} 
                onBlur={this.handleChange} 
                placeholder="Link a Song!" 
                name="event-songlink" 
                id="songLink" 
                ref={node => this.songLink = node}
                required>
              </input>
                              
              <button 
                className="submit-event-form" 
                type="submit" 
                value="submit" 
                onClick={this.handleSaveEvent}>Create Your Event!
              </button>
            </div>
          </form>
        </div>
      </Popup>
    );
  }
}

export default Eventform;
