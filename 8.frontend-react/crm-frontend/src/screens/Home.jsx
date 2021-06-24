import React from 'react';
import AuthApi from '../helpers/authApi';

const authApi = new AuthApi();

function Home(props) {
    return (
        <div>
            <button id="logout" onClick={()=>authApi.logout()}>Logout</button>
            home page
        </div>
    );
}

export default Home;