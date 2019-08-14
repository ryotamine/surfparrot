import React, { Component } from "react";
import Navbar from "./navbar";

// Home class
class Home extends Component {
  render() {
    return (
      <div>
        <Navbar setUser={this.props.setUser}/>
      </div>
    );
  }
}

export default Home;
