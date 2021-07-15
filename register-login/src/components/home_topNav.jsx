import React from "react";
import Button from '../components/button'
import {Link} from "react-router-dom";

function Home_TopNav(props) {

    return (
        <body>
        <div className="topnav">
        <div className="topnav_text">
            Beautiz
        </div>
        <Link className ="link" to="/treatments"> Treatments</Link>
        <Link className ="link" to="/clients"> Clients</Link>
        <Link className ="link" to="/users"> Users</Link>
        <Link className ="link" to="/kinds"> Kinds of Treatment</Link>
      
        <Button className = {props.className} button_text={props.button_text} onClick={props.onClick}></Button> 
       
      </div>
      </body>
    );
}


export default Home_TopNav;