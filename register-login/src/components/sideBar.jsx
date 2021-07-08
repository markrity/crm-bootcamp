import Button from '../components/button'
import React from "react";

import {Link} from "react-router-dom";



function SideBar(props) {

    
    return (
        <div class="sidenav">
        <Link to="/users"> Users</Link>
        <Link to="/clients"> Clients</Link>

      
  
      </div>
    );
}


export default SideBar;