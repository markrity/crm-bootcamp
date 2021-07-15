import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit, faPlusSquare, faSlidersH } from '@fortawesome/free-solid-svg-icons';


function ButtonIcon(props)  {

    return (
   
    <button 
    className={props.className} onClick={props.onClick}  >
    <FontAwesomeIcon  icon={faPlusSquare} size={"lg"}/>
    {props.button_text}
    </button>

    );
}


export default ButtonIcon;