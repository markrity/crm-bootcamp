import React from "react";

function TopNav(props) {

    return (
        <div className="topnav">
        <div className="topnav_text">
            Beautiz
        </div>
        <div className={props.className}>
          <button className={props.button_class}>{props.button_text}</button>
          <button className={props.button_class}>{props.button_text}</button>
          <button className={props.button_class}>{props.button_text}</button>
        </div>
      </div>
    );
}


export default TopNav;