import React, { useEffect, useState } from 'react'
import AuthForm from '../Components/AuthForm'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import ClickableTxt from '../Components/ClickableTxt'
import Header from '../Components/Header';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import '../App.css'



const Auth = () => {
    const history = useHistory();
    const isOnline = useSelector(state => state.auth.isOnline)

    const [isNewBuisness, setIsNewBuisness] = useState(true)
    useEffect(() => {
        if (isOnline) {
            history.push("/");
        }
    }, [isOnline])



    return (
        <>
            <Header />
            <AuthForm isNewBuisness={isNewBuisness} setIsNewBuisness={setIsNewBuisness} isNewUser={false} />
        </>
    )
}


export default Auth;