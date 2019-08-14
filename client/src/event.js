import React, { Component } from "react";
import Eventform from "./event_form";

// Create event form class
class EventCreation extends Component {
  // Create event form constructor
  constructor(props) {
    super(props);

    this.state = { 
      openEvent: false
    };
  }

  // Open event popup helper function
  openEventModal = () => {
    this.setState({ openEvent: true });
  }

  // Close event popup helper function
  closeModal = () => {
    this.setState({ 
      openEvent: false
    });
  }
  
  // Render event form
  render() {
    return (
      <div>
        <button className="main-register main-nav" onClick={this.openEventModal}>
          create event 
        </button>
          
        {this.state.openEvent && <Eventform closeModal={this.closeModal} 
        openModal={this.openModal} event={this.state.openEvent}/>}
      </div>
    );
  }
}

export default EventCreation;
