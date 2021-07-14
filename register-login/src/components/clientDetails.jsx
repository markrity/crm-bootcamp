import React from "react";

function ClientDetails(props)  {

    return (
    <div className = "client_details" >
        client name: {props.client_fullname}
        client phone: {props.client_phone}
        client email: {props.client_email}
    </div>

    );
}


export default ClientDetails;