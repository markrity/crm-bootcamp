import React from 'react';
import '../styles/logo.css';

function Logo(props) {
    var classes = `logo-container ${props.size}`
    return (
        <div className={classes}>
            <span className='logo-text'>RGB</span>
            <div className='logo-deco'></div>
        </div>
    );
}

export default Logo;