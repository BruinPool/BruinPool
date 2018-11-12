import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import App from './components/App/App';

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  MOUNT_NODE
);
