import React, { Component } from 'react';
import EventCreation from './event_form'; 
import axios from 'axios';

// Artist content class
class ArtistContent extends Component {
  // Artist content constructor
  constructor(props) {
    super(props);

    this.state = { 
      events: [],
      delete: null,
      id: 0
    };

    this.removeEvent = this.removeEvent.bind(this);


    // this.handleEdit = this.handleEdit.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }
//delete event helper function
removeEvent(evt) { 
  console.log("evt.target.id", evt.target.id)
  console.log("REMOVE EVENT")
   fetch("/events/userEvents/delete" , {
      method: "DELETE",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({'id': parseInt(evt.target.id)})
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.getUserEvents();

        this.setState({
          response: result,
          // events: events.filter(event => event.id !== eventId)
        });
      },
      (error) => {
        // this.setState({ error });
        console.log(error)
      }
    )
    // // Edit event helper function
    //   handleEdit(event) {
    //   this.setState({eventName: event})
    // }
  
    // // Delete event helper function
    // handleDelete(event) {
    //   const data = this.state.data.filter(i => i.name !== event.name)
    //   this.setState({data});
  }

  getUserEvents = () => {
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
      this.setState({id: response.result.id})
      }); 
  }

  componentDidMount() {
//grab events from the db!;
    this.getUserEvents();

//delete events 
}

renderEvent = (data) => {
    this.setState({id: data.id})
    console.log(this.state.id)
    return (
      <li className="event-info">
        <div className="align-event-option">
          <a className="name-event">
            {data.event}
          </a>
          <button id ={data.id} className="delete-event" onClick={this.removeEvent} >
            <i className="far fa-trash-alt" id={data.id}></i>
          </button>
        </div>
      </li>
    
    )
    
  }
    render() {
      console.log(this.state.events)
    return (

      <div>
        <h1 className="artist-my-events">my events</h1> 
        {this.state.events}
      </div>
    );
  }  
}

export default ArtistContent;
