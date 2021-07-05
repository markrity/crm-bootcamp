import Button from '../components/button'
import React from "react";

function SideBar(props) {

    
    return (
        <div class="sidenav">
        <Button className="button1" button_text="Users" onClick={props.onClick}></Button>
      </div>
    );
}


export default SideBar;