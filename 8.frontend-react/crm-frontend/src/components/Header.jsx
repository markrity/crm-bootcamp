import React, {useState} from 'react';
import Navigation from './Navigation';
import Logo from './Logo';
import '../styles/header.css'
import AuthApi from '../helpers/authApi';
import CrmButton from './CrmButton';
const authApi = new AuthApi();

function Header(props) {

    const [isLogout, setIsLogout] = useState(false);

    const links = [
        {
            title: "Home", 
            url: '/home'
        }, 
        {
            title: "Teams", 
            url: '/team'
        }, 
        {
            title: "Settings", 
            url: '#'
        }
    ];

    const logoutFunc = ()=>{
        authApi.logout();
        // TODO - use the state instead of window
        window.location.href = 'http://localhost:3000/login';
        setIsLogout(true);
    }

    return (
        <div className="header-container">
            <Logo size='xsmall'/>
            <div className='nav-wrapper' >
                <div className='links-container'>
                <Navigation links={links}/>
                </div>
            <CrmButton content='Log out' callback={()=> logoutFunc()}/>
            {/* <button id="logout" onClick={()=>logoutFunc()}>Logout</button> */}
            </div>
        </div>
    );
}

export default Header;