import React, { Component } from 'react';
import moment from 'moment';

// const determineDate = cb => {
// 	require.ensure([], (require) => {
// 		const moment = require('moment');
// 		cb && cb(moment);
// 	}, 'moment');
// }

class App extends Component {
	constructor(props) {
		super(props);
		
	}
	handleClick = e => {
		e.preventDefault();
		// determineDate(moment => console.log(moment().format()))
	}
	render() {
		return (
			<div>
				<div>beauty is </div>
				<button onClick={this.handleClick}>show time</button>
			</div>
		);
	}
}

export default App;