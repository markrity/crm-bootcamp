import React from 'react';

function Login(props) {
    const logOut=()=>{
        localStorage.removeItem("token");
        window.location.reload();
    }
    return (
        <div className="homepage" onClick={logOut}>
            logOut

        </div>
    );
}

export default Login;