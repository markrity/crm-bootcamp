import React from "react";
import Button from '../components/button'

function Home_TopNav(props) {

    return (
        <div className="topnav">
        <div className="topnav_text">
            Beautiz
        </div>
        <div className="buttons">
        <Button className = {props.className} button_text={props.button_text} onClick={props.onClick}></Button> 
        </div>
      </div>
    );
}


export default Home_TopNav;