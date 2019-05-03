import React, { Component } from 'react';
import Popup from "reactjs-popup";

// Artist content class
class ArtistContent extends Component {
  // Artist constructor
  constructor(props) {
    super(props);
    this.state = { open: false}
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

  }
  
  // Open create event helper function
  openModal () {
    this.setState({ open: true })
  }

  // Close create event helper function
  closeModal () {
    this.setState({ open: false })
  }

  // Render artist content
  render() {
    return (
      <div>
        <h1 className="artist-my-events">My Events</h1>

        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div id="id04" className="modal">
            <a className="close" onClick={this.closeModal}>
            &times;
            </a>
            
            <form onSubmit={this.handleSubmit} className="eventForm">
              <div className="info-event-form">
                <label htmlFor="event-name"><b>Event Name</b></label>
                <input className="event-name-create" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Event Name" name="event-name-create" required></input>

                <label htmlFor="Date"><b>Date</b></label>
                <input className="event-date-create" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Last Name" name="last-name" required></input>

                <label htmlFor="Location"><b>Location</b></label>
                <input className="event-location-create" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Add Location" name="email" required></input>
              
                <label htmlFor="song-link"><b>Link a song!</b></label>
                <input className="event-songlink-create" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Link a song!" name="event-songLink-create" required></input>
                              
                <button className="submit-event-form" type="submit" value="submit">Create Your Event!</button>
              </div>
            </form>
          </div>
        </Popup>
      </div>
    );
  }
}

export default ArtistContent;
