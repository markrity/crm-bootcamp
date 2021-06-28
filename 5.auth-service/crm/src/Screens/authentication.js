import React, { useEffect, useState } from 'react'
import AuthForm from '../Components/AuthForm'
import Header from '../Components/Header';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import '../App.css'
import Card from '../Components/Card';



const Auth = () => {
    console.log("In Auth")
    const history = useHistory();
    const isOnline = useSelector(state => state.auth.isOnline)

    const [isNewBuisness, setIsNewBuisness] = useState(true)
    useEffect(() => {
        if (isOnline) {
            history.push("/");
        }
    }, [isOnline])

    const authForm = <AuthForm isNewBuisness={isNewBuisness} setIsNewBuisness={setIsNewBuisness} isNewUser={false} />

    return (
        <>
            <Header />
            <div className='centered'>
                <Card left={authForm} />
            </div>

        </>
    )
}


export default Auth;