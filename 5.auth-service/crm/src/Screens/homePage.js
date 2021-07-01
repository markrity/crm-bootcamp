import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css'
import { logout } from '../actions/auth'
import ClickableTxt from '../Components/ClickableTxt';
import Header from '../Components/Header';
const HomePage = () => {
    console.log("HomePage")
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.auth.isOnline)
    return (
        <>
            <Header />
            <div className="centered">
                {isOnline && <ClickableTxt clickabletxt="Logout" onClickFunc={() => dispatch(logout())} />}
            </div>
        </>
    )
}

export default HomePage
