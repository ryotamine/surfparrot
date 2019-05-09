import React, { Component } from 'react';

// Name form search class
class NameForm extends Component {
	// Name form search constructor
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// Name form search change helper function
	handleChange(event) {
		this.setState({value: event.target.value});
	}

	// Name form search submit helper function
	handleSubmit(event) {
		event.preventDefault();
		this.props.onSearchTermChange(this.state.value);
	}

	// Render name form search
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				{/* <label>
						Artist:
						<input className="artistSearch" type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" /> */}
			</form>
		)
	}
}

export default NameForm;
