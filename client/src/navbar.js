import React, { Component } from 'react';
import Login from './login';
import Registration from './registration_form';
import Contact from './contact';

class Navbar extends React.Component {
   

    render() {
        return (
           <div className="topnav">
                <Registration/>
                <Login />
                <Contact />
            </div>
        )
    }

}

export default Navbar;