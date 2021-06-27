import React, { useEffect } from 'react';
import { checkAuth } from '../actions/auth'
import axios from 'axios';
import { connect, useDispatch, useSelector } from 'react-redux';
import '../App.css'
import { logout } from '../actions/auth'
import { Redirect, useHistory } from 'react-router';
import ClickableTxt from '../Components/ClickableTxt';
const HomePage = () => {
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.auth.isOnline)
    const history = useHistory();
    if (!isOnline)
        history.push("/auth")
    return (
        <>
            <div id="header-bar">
            </div>

            <div className="default">
                {isOnline && <ClickableTxt txt="Logout" onClickFunc={() => dispatch(logout())} />}
                <p>asdas</p>
            </div>
        </>
    )
}

export default HomePage
