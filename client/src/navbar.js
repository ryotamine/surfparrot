import React, { Component } from 'react';
import Login from './login';
import Registration from './registration_form';
import Contact from './contact';

class Navbar extends React.Component {
   

    render() {
        return (
            <header>
                <div className="logo">
                    <img src="/docs/logo.jpg"></img>
                </div>

                <button className='home'><a className='home main-nav' href='/'>surfparrot</a></button>

                <div className="rightnav">
                    <ul>
                        <li><Registration /></li>
                        <li><Login /></li>
                        <li><Contact /></li>
                    </ul>
                </div>
            </header>
        )
    }

}

export default Navbar;