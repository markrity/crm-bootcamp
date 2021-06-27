import React, {useEffect} from 'react';
import AuthApi from '../helpers/authApi';
import {
    Redirect
  } from "react-router-dom";

const authApi = new AuthApi();



function Home(props) {

    let isUserAuthenticated = localStorage.getItem('jwtToken') ? true : false;
    // console.log("isUserAuthenticated:", isUserAuthenticated);
    // if(isUserAuthenticated){
    //     var result = authApi.ping() ;
    //     console.log("ping result:", result);
    //     if(!result || !result.valid){
    //         isUserAuthenticated = false;
    //         console.log("isUserAuthenticated change to true: ", result);
    //     }
    // }


    return (
        
        <div>
            {!isUserAuthenticated && <Redirect to="/login" />}
            <button id="logout" onClick={()=>authApi.logout()}>Logout</button>
            home page
        </div>
    );
}

export default Home;