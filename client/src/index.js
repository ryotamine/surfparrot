import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
require('./login.css');
require('./require-login.js');

const routing = (
  <Router>
    <div>
      <Link to="/">surfparrot</Link>
      <Route exact path="/" component={App} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
