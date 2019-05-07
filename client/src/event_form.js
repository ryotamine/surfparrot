import React, { Component } from 'react';
import Popup from "reactjs-popup";

// Create event form class
class EventCreation extends Component {
  // Create event form constructor
  constructor(props) {
    super(props);
    this.state = 
    { 
      open: false,
      eventName: '',
      eventDate: '',
      eventLocation: '',
      songLink: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveEvent = this.handleSaveEvent.bind(this);
    // this.setEventName = this.setEventName.bind(this);
  }
  
  // Open event form helper function
  openModal () {
    this.setState({ open: true })
  }

  // Close event form helper function
  closeModal () {
    this.setState({ open: false })
  };

  // Change event form helper function
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  // Save event form helper function
  handleSaveEvent(event) {
    event.persist();

    fetch('/saveEvent', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        "Content-Type": "application/json",
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
    .then(
      // use the function that changes state of eventName ON artist_content.js
      // setEventName(event) {
      //   [event.target.id]: event.target.value
      // }
      // set that state to the name of the event from here
      // this.props.handleEvent(this.state.eventName),
      // console.log("Event", this.state.eventName)
    ).then(response => {
      response.json()
    }); 
    console.log("this state", this.state)
  }
  // Render event form
  render() {
    console.log(this.props)
    return (
      <div>
        <button className="main-register main-nav" onClick={this.openModal}>
          create event 
        </button>
        
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
          >
        <div id="id02" className="modal">
          <a href className="close" onClick={this.closeModal}>
          &times;
         </a>
          <form onSubmit={this.handleSubmit} className="registrationForm">
          
            <div className="info-event">
              <label htmlFor="event-name" className="event-name"><b>Event Name</b></label>
              <input 
                className="event-name-create" 
                type="text" value={this.state.value} 
                onBlur={this.props.handleName} 
                placeholder="Event Name" 
                name="event-name-create" 
                id="eventName" 
                ref={this.props.name} 
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
      </div>
    )
  }
}

export default EventCreation;
