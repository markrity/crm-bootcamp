import React from "react";

function DivController(props) {
    return (
    <div className="divController">
        <div className="pController" > 
        {props.p_text}
        </div> 
        <div className="clickController" onClick={props.onClick}>
        {props.click_text}
        </div>
    </div>
    );
}

export default DivController;