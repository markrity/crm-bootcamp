import React from "react";

function ClientDetails(props)  {

    return (
     <div className="border_details"> 
    <div className = "client_details" >
        <p className="detail">Full name: {props.client_fullname}</p>
        <p className="detail">Phone: {props.client_phone}</p>
        <p className="detail">Email: {props.client_email}</p>
    </div>
     </div>

    );
}


export default ClientDetails;