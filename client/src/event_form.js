import React, { Component } from 'react';
import Popup from "reactjs-popup";
import { Redirect } from 'react-router';


class EventCreation extends Component {

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
  }
   
  openModal () {
    this.setState({ open: true })
  }
  closeModal () {
    this.setState({ open: false })
  };

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value

    });
  }
  
    handleSaveEvent(event) {
      event.persist();
    console.log("handle save event", this.state)

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
    .then(response => response.json()); 

  }
  //   this.state = {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: ''
  //   };
    
  // handleChange(event) {
  //   this.setState({
  //     firstName: event.target.value,
  //     lastName: event.target.value,
  //     email: event.target.value,
  //     password: event.target.value
  //   })
  // }
  // handleSubmit(event) {
  //   alert('User Form Submitted: ' + this.state.value);
  //   event.preventDefault();
  // }
  render() {
    return (
      <div>
        <button className="main-register main-nav" onClick={this.openModal}>
         Create Event 
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
                onBlur={this.handleChange} 
                placeholder="Event Name" 
                name="event-name-create" 
                id="eventName" 
                ref={node => this.eventName = node} 
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
export default EventCreation

