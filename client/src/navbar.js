import React, { Component } from 'react';
import Login from './login';
import Registration from './registration_form';
import Contact from './contact';
import EventCreation from './event_form';

class Navbar extends Component {

    render() {
        return (
            <header>
                <div className="logo">
                    <img src="/docs/parrot2.png"></img>
                </div>

                <button className='home'><a className='home main-nav' href='/'>surfparrot</a></button>

                <div className="rightnav">
                    <ul>
                        <li><Registration /></li>
                        <li><Login /></li>
                        <li><Contact /></li>
                        <li><EventCreation /></li>
                    </ul>
                </div>
            </header>
        )
    }

}


export default Navbar;