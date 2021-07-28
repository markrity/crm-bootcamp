import React from "react";

function Messages(props) {

    return (
        <div className="div_frame">
        <iframe className = "frame" src='http://localhost:9034/crmChat'></iframe>
        </div>
    );
}


export default Messages;