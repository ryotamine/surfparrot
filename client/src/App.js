import React, { Component } from 'react';
import './App.css';

// App class
class App extends Component {
  render() {
    return (
      <div>
        <nav className='navbar navbar-expand-lg'>
          <a className='navbar-brand' href='/'>surfparrot</a>
          <div>
            <ul className='nav justify-content-end'>
              <li class='nav-item'>
                <a className='nav-link' href='/'>Login</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/'>Register</a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/'>Contact</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default App;
