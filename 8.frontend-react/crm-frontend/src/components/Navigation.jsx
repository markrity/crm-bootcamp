import React from 'react';
import '../styles/navigation.css'
import {
    // BrowserRouter as Router,
    Link,
    useParams,
    withRouter
  } from "react-router-dom";

function Navigation(props) {
    
    const linksList = [];
    for (let link of props.links){
        // linksList.push(<li><a href={link.url}>{link.title}</a></li>);
        linksList.push(<Link className='nav-link' to={link.url}>{link.title}</Link>)
    }

    return (
        <div className="nav-container">
            <nav class="nav-menu">
            <ul>
                {linksList}
            </ul>
            </nav>
        </div>
    );
}

export default Navigation;