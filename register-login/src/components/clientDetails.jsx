import React from "react";

function ClientDetails(props)  {

    return (
    <div className = "client_details" >
        <p className="detail">Full name: {props.client_fullname}</p>
        <p className="detail">Phone: {props.client_phone}</p>
        <p className="detail">Email: {props.client_email}</p>
    </div>

    );
}


export default ClientDetails;