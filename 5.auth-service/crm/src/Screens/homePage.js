import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import '../App.css'
import { logout } from '../actions/auth'
import ClickableTxt from '../Components/ClickableTxt';
import Header from '../Components/Header';
import { useHistory } from 'react-router';
const HomePage = ({ isOnline }) => {


    return (
        <>
            <Header />
        </>
    )
}


export default HomePage
