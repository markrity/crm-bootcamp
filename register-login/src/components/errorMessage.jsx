import React from "react";

function ErrorMessage(props) {

    return (
    <div className="error" >
       {props.err}
    </div>
    );
}


export default ErrorMessage;