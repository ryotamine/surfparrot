import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
// require('../styles/home.css');



const routing = (
  <Router>
    <div>
      <Link to="/">surfparrot</Link>
      <Route exact path="/" component={App} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
