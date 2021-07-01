import React, {useState} from 'react';
import AuthApi from '../helpers/authApi';
// import {
//     Redirect
//   } from "react-router-dom";

const authApi = new AuthApi();



function Home(props) {

    const [isLogout, setIsLogout] = useState(false);

    const logoutFunc = ()=>{
        authApi.logout();
        // TODO - use the state instead of window
        window.location.href = 'http://localhost:3000/login';
        setIsLogout(true);
    }

    return (
        <div>
            {/* {isLogout &&  <Redirect to="/login" />} */}
            {/* {!isUserAuthenticated && <Redirect to="/login" />} */}
            <button id="logout" onClick={()=>logoutFunc()}>Logout</button>
            home page
        </div>
    );
}

export default Home;