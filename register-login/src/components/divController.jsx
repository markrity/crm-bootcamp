import React from "react";

function DivController(props) {
    return (
    <div className="divController" onClick={props.onClick}>
    {props.header_text}
    </div>
    );
}

export default DivController;