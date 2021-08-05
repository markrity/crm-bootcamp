

import React, { useState } from "react";
import Button from './button'
import {Link} from "react-router-dom";
import '../style/home.scss'


function Home_TopNav(props) {
    const [clicked, setClicked] = useState('home')

    return (
     <div>
        <div className="topnav">
        <div className="topnav_text">
            Beautiz
        </div>
        <nav role="navigation" class="primary-navigation">
        <ul>
        <li><Link className ={clicked=="home" ? "bright" : "link" } to="/home"onClick={()=>setClicked('home')}> Home</Link></li>
        <li><Link className ={clicked=="treatments" ? "bright" : "link" } to="/treatments" onClick={()=>setClicked('treatments')}> Treatments</Link></li>
        <li><Link className ={clicked=="clients" ? "bright" : "link" } to="/clients" onClick={()=>setClicked('clients')}> Clients</Link></li>
        <li><Link className ={clicked=="users" ? "bright" : "link" } to="/users" onClick={()=>setClicked('users')}> Users</Link></li>
        <li><Link className ={clicked=="calender" ? "bright" : "link" } to="/calender" onClick={()=>setClicked('calender')}> Calender</Link></li>
        <li><Link className ={clicked=="messages" ? "bright" : "link" } to="/messages" onClick={()=>setClicked('messages')}> Messages</Link></li>
        </ul>
        </nav>
        <Button className = {props.className} button_text={props.button_text} onClick={props.onClick}></Button> 
        </div>

      </div>
     
    );
}




export default Home_TopNav;