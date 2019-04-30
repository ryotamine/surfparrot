import React, { Component } from 'react';
import Popup from 'reactjs-popup';

// Contact class
class Contact extends Component {
  // Contact constructor
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // Open contact popup helper function
  openModal () {
    this.setState({ open: true });
  }

  // Close contact popup helper function
  closeModal () {
    this.setState({ open: false });
  }

  // Render login popup
  render() {
    return (
      <div>
        <button className="main-contact" onClick={this.openModal}>
          Contact
        </button>

        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >

          <div id="id03" className="modal">
            <a className="close" onClick={this.closeModal}>
              &times;
            </a>
          
            <form onSubmit={this.handleSubmit} className="contactForm">

              <div className="info-contact">
                <label htmlFor="name"><b>Name</b></label>
                <input className="name-contact" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Name" name="name" required></input>

                <label htmlFor="email"><b>Email</b></label>
                <input className="email-login" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Email Address" name="email" required></input>

                <label htmlFor="subject"><b>Subject</b></label>
                <input className="subject-contact" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Subject" name="subject" required></input>

                <div>
                  <label htmlFor="comment"><b>Comment</b></label>
                </div>
                <textarea className="comment-contact" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Comment" name="comment" required></textarea>
                
                <button className="submit-contact" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </Popup>
      </div>
    )
  }
}

export default Contact;
