import React, { Component } from "react";
import ArtistContent from "./artist_content";

// Artist app class
class ArtistApp extends Component {
  // Artist app constructor
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    }

    this.handleName = this.handleName.bind(this);
  }

  // Artist name helper function
  handleName(evt) {
    this.setState({
      name: evt.target.value
    });
  }

  // Render artist page
  render() {
    return (
      <div>
        <ArtistContent name={this.state.name}/>
      </div>
    );
  }
}

export default ArtistApp;
