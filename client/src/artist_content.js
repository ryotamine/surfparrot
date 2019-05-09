import React, { Component } from 'react';

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
  }

  // Delete event helper function
  removeEvent(evt) {
    fetch("/events/userEvents/delete", {
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
            response: result
          });
        },
        (error) => {
          console.log(error)
        }
      )
  }

  // POST artist event to back-end
  getUserEvents = () => {
    fetch("/events/userEvents", {
      method: "POST",
      mode: "cors", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({'id': 34245 })
    })
      .then(response => response.json())
      .then(response => {
        let artistEvents = response.result.map((event) => this.renderEvent(event));
        this.setState({events: artistEvents});
        this.setState({id: response.result.id});
    });
  }

  // Component mount function
  componentDidMount() {
    this.getUserEvents();
  }

  // Remove event function
  renderEvent = (data) => {
    this.setState({id: data.id});
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
    );
  }

  // Render artist events
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
