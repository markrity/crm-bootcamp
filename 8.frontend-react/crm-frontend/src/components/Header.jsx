import React from 'react';
import Navigation from './Navigation';
import Logo from './Logo';
import '../styles/header.css'
import AuthApi from '../helpers/authApi';
import CrmButton from './CrmButton';
const authApi = new AuthApi();

function Header(props) {


    const links = [
        {
            title: "Home", 
            url: '/home'
        }, 
        {
            title: "Projects", 
            subLinks: [
                {
                    title: "All projects", 
                    url: '/2'
                },
                {
                    title: "My projects", 
                    url: '/3'
                }, 
            ]
        }, 
        {
            title: "Clients", 
            url: '/6'
        }, 
        {
            title: "Team", 
            url: '/team'
        }, 
        {
            title: "Finance", 
            url: '/7'
        }, 
        {
            title: "Settings", 
            url: '/5'
        }
    ];

    const logoutFunc = async ()=>{
        await authApi.logout();
        // TODO - use the state instead of window
        window.location.href = 'http://localhost:3000/login';
        
    }

    return (
        <div className="header-container">
            <Logo size='xsmall'/>
            <div className='links-container'>
                <Navigation links={links}/>
                </div>
            <div className='nav-wrapper' >
            <CrmButton buttonClass='spacial-button' content='Log Out' callback={()=> logoutFunc()}/>
            {/* <button id="logout" onClick={()=>logoutFunc()}>Logout</button> */}
            </div>
        </div>
    );
}

export default Header;