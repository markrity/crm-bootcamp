import React from "react";

function PLink(props) {

    return (
    <a href={props.linkTo} className="p_link" >
      <span> {props.link_text} </span> 
    </a>
    );
}


export default PLink;