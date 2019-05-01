import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import UserApp from './user_app';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/user" component={UserApp} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
