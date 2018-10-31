'use strict';

/*
 * Moudle dependencies
 */
import '../styles/main.css';
import React from 'react';
import ReactDOM from 'react-dom';

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader';
import Home from './components/Home.js'

const env = process.env.NODE_ENV

const render = (Component) => {
  ReactDOM.render(
  	<AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Home);

// Hot Module Replacement API
if (module.hot && env == "dev") {
  module.hot.accept('./components/Home.js', () => {
    render(Home);
  });
}
