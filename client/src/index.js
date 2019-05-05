import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import UserApp from './user_app';
import ArtistApp from './artist_app';
import Recommendations from './recommendations.js'

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/users/:id" component={UserApp} />
      <Route exact path="/user" component={UserApp} />
      <Route exact path="/artist" component={ArtistApp} />
      <Route exact path="/artists/:id" component={ArtistApp} />
      <Route exact path="/recommendations" component={Recommendations} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
