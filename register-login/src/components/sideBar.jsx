import Button from '../components/button'
import React from "react";

import {Link} from "react-router-dom";



function SideBar(props) {

    
    return (
        <div class="sidenav">
        <Link to="/users"> Users</Link>
        <Link to="/clients"> Clients</Link>

        {/* <Button className="side_bar" button_text="Users" onClick={props.onClick}></Button>
        <Button className="side_bar" button_text="Clients" onClick={props.onClick}></Button> */}
      </div>
    );
}


export default SideBar;