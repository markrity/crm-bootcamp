import React, {useState} from 'react';
import AuthApi from '../helpers/authApi';
import Header from '../components/Header';
import CrmButton from '../components/CrmButton';
import PageTitle from '../components/PageTitle';
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
            <PageTitle className='page-title' title='Home'/>
            </div>
        </div>
    );
}

export default Home;