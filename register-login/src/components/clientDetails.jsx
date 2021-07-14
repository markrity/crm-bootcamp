import React from "react";

function ClientDetails(props)  {

    return (
    <div className = "client_details" >
        <p className="detail">client name: {props.client_fullname}</p>
        <p className="detail">client phone: {props.client_phone}</p>
        <p className="detail">client email: {props.client_email}</p>
    </div>

    );
}


export default ClientDetails;