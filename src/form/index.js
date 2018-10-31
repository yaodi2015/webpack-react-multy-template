'use strict';

/*
 * Moudle dependencies
 */
import '../styles/form.css';
import React from 'react';
import ReactDOM from 'react-dom';

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader';
import Form from './components/Form.js'

const env = process.env.NODE_ENV

const render = (Component) => {
  ReactDOM.render(
  	<AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Form);

// Hot Module Replacement API
if (module.hot && env == "dev") {
  module.hot.accept('./components/Form.js', () => {
    render(Form);
  });
}
