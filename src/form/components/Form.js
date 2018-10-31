import React, { Component } from 'react';
import moment from 'moment';

class Form extends Component {
	constructor(props) {
		super(props);
		
	}
	handleSubmit = e => {
		e.preventDefault();
	}
	render() {
		return (
			<p>Form is not needed moment{moment().format()}</p>
		)
	}
}

export default Form;