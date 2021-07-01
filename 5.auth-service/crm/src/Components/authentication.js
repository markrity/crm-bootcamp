import React, { useState, useEffect } from 'react'
import AuthForm from './AuthForm'
import Header from './Header';
import '../App.css'
import Card from './Card';
import { newBuisnessFormFields, loginFormFields, signupFormFields, forgotPasswordFields, changePasswordFields } from '../formFields'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const Auth = ({ initMode }) => {
    const history = useHistory()
    const [mode, setMode] = useState(initMode ?? 'New Buisness')
    const { isOnline } = useSelector(state => state.auth)

    useEffect(() => {
        if (isOnline) {
            history.push("/");
        }
    }, [isOnline, mode, history])

    const formFields = mode === "New Buisness" ? newBuisnessFormFields :
        mode === "Add Employee" ? signupFormFields :
            mode === "Reset Password" ? forgotPasswordFields : mode === "Change Password" ? changePasswordFields :
                loginFormFields

    const authForm = <AuthForm mode={mode} setMode={setMode} formFields={formFields} />
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