import React, { Component } from 'react';
import ArtistContent from './artist_content';

// Artist App class
class ArtistApp extends Component {
  constructor(props) {
    super(props);
    // this.textEvent = React.createRef();
    this.state = {
      name: ''
    }
    this.handleName = this.handleName.bind(this);
  }

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
