import React from 'react';
import Navigation from './Navigation';
import Logo from './Logo';
import '../styles/header.css'

function Header(props) {

    const links = [
        {
            title: "Teams", 
            url: '#'
        }, 
        {
            title: "Settings", 
            url: '#'
        }
    ];

    return (
        <div className="header-container">
            <Logo size='xsmall'/>
            <Navigation links={links}/>
        </div>
    );
}

export default Header;