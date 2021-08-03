import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit, faPlusSquare, faSlidersH } from '@fortawesome/free-solid-svg-icons';


function ButtonIcon(props)  {

    return (
   
        <button className="add_button_tre"  onClick={props.onClick}> 
        <FontAwesomeIcon icon={faPlusSquare} size={"2x"}/>
        <div className="text_add_button">
         Add 
         </div>
        </button>

    );
}


export default ButtonIcon;