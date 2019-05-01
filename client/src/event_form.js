import React, { Component } from 'react';
import Popup from "reactjs-popup";


class EventCreation extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false}
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

  }
   
  openModal () {
    this.setState({ open: true })
  }
  closeModal () {
    this.setState({ open: false })
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
        <button className="button" onClick={this.openModal}>
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
              <label htmlFor="event-name"><b>Event Name</b></label>
              <input className="event-name-create" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Event Name" name="event-name-create" required></input>

              <label htmlFor="Date"><b>Date</b></label>
              <input className="event-date-create" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Last Name" name="last-name" required></input>

              <label htmlFor="Location"><b>Location</b></label>
              <input className="event-location-create" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Email Address" name="email" required></input>
            
              <label htmlFor="song-link"><b>Link a song!</b></label>
              <input className="event-songLink-create" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Link a song!" name="event-songLink-create" required></input>
                            
              <button className="submit-event" type="submit" value="submit">Create Your Event!</button>
            </div>
          </form>
        </div>
        </Popup>
      </div>
    )
  }
}

export default EventCreation

