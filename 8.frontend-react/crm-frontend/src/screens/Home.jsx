import React, {useState} from 'react';
import AuthApi from '../helpers/authApi';
import Header from '../components/Header';
import CrmButton from '../components/CrmButton';
import '../styles/crmPage.css'
// import {
//     Redirect
//   } from "react-router-dom";

const authApi = new AuthApi();



function Home(props) {


    return (
        <div>
            <Header/>
            <div className='crm-page'>
                home page
            </div>
        </div>
    );
}

export default Home;