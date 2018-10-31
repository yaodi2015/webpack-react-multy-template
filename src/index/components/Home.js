'use strict';
/*
 * Dependencies
 */
import React from 'react';
import moment from 'moment';
/*
 * Create component
 */
const Home = () => (
	<div>{moment().format('YYYY-MM-DD HH:mm')}</div>
);

export default Home;