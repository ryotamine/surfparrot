import React, { Component } from 'react';
import EventCreation from './event_form'; 
import axios from 'axios';

// Artist content class
class ArtistContent extends Component {
  // Artist content constructor
  constructor(props) {
    super(props);

    this.state = { 
      events: []
    };
    
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
//grab events from the db!
    fetch("/events/userEvents", {
      method: "POST",
      mode: "cors", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({'id': 34245 }),
    }).then(response => 
      response.json()
    )
    .then(response => {
      let artistEvents = response.result.map((event) => this.renderEvent(event))
      this.setState({events: artistEvents})
    console.log("artist content state", this.state)
    }
  )


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

  renderEvent = (data) => {
    console.log(data)
    return (
      <li className="event-info">
            <div className="align-event-option">
              <a className="name-event">
                {data.event}
              </a>
              <button  className="delete-event" >
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
          </li>
    )
  }
    render() {
    return (

      <div>
        <h1 className="artist-my-events">my events</h1> 
        {this.state.events}
      </div>
    );
  }
  
}

export default ArtistContent;
