import React from "react";

function Button(props)  {

    return (
    <button className={props.className} onClick={props.onClick}  >
    {props.button_text}
    </button>
    );
}


export default Button;