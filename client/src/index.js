import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import UserApp from './user_app';
import ArtistApp from './artist_app';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/user" component={UserApp} />
      <Route path="/artist" component={ArtistApp} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
