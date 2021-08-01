

import React, { useState } from "react";
import Button from './button'
import {Link} from "react-router-dom";


function Home_TopNav(props) {
    const [clicked, setClicked] = useState('home')

    return (
     <div>
        <div className="topnav">
        <div className="topnav_text">
            Beautiz
        </div>
        <Link className ={clicked=="home" ? "bright" : "link" } to="/home"onClick={()=>setClicked('home')}> Home</Link>
        <Link className ={clicked=="treatments" ? "bright" : "link" } to="/treatments" onClick={()=>setClicked('treatments')}> Treatments</Link>
        <Link className ={clicked=="clients" ? "bright" : "link" } to="/clients" onClick={()=>setClicked('clients')}> Clients</Link>
        <Link className ={clicked=="users" ? "bright" : "link" } to="/users" onClick={()=>setClicked('users')}> Users</Link>
        <Link className ={clicked=="calender" ? "bright" : "link" } to="/calender" onClick={()=>setClicked('calender')}> Calender</Link>
        <Link className ={clicked=="messages" ? "bright" : "link" } to="/messages" onClick={()=>setClicked('messages')}> Messages</Link>
        <Button className = {props.className} button_text={props.button_text} onClick={props.onClick}></Button> 
        </div>

      </div>
     
    );
}


export default Home_TopNav;