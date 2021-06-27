import React from 'react';
import './css/homepage-style.css'
function Login(props) {
    const logOut=()=>{
        localStorage.removeItem("token");
        window.location.reload();
    }
    return (
        <div>
        <div className="homepage" onClick={logOut}>
            
            logOut
            
        </div>
        {props.userName}
        </div>
    );
}

export default Login;