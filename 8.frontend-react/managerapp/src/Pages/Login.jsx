import React from 'react';

function Login(props) {
    const logOut=()=>{
        localStorage.removeItem("token");
        window.location.href="/"
    }
    return (
        <div onClick={logOut}>
            logOut
        </div>
    );
}

export default Login;