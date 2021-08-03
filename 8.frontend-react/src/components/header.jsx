
import React from "react";

function Header(props) {
    return (
    <h1 className="header">
    {props.header_text}
    </h1>
    );
}


export default Header;