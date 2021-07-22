import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import '../App.css'
import { logout } from '../actions/auth'
import ClickableTxt from '../Components/ClickableTxt';
import Header from '../Components/Header';
import { useHistory } from 'react-router';
import Artists from '../Components/Stats/Artists/Artists';
import SideNavBar from '../Components/SideNavBar';
const HomePage = ({ isOnline }) => {


    return (
        <>
            <Header />
            <div className="flex-row">
                <SideNavBar selected="Create Event" />
                <div className="flex-row space-around">
                    <Artists />
                </div>
            </div>
        </>
    )
}

export default HomePage
