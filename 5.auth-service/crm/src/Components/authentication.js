import React, { useState } from 'react'
import AuthForm from './AuthForm'
import Header from './Header';
import '../App.css'
import Card from './Card';
import { newBuisnessFormFields, loginFormFields, signupFormFields, forgotPasswordFields, changePasswordFields } from '../formFields'

const Auth = ({ initMode }) => {
    const [mode, setMode] = useState(initMode ?? 'New Buisness')
    // useEffect(() => {
    //     if (isOnline ) {
    //         history.push("/");
    //     }
    // }, [isOnline])

    const formFields = mode === "New Buisness" ? newBuisnessFormFields :
        mode === "Add Employee" ? signupFormFields :
            mode === "Forgot Password" ? forgotPasswordFields : mode === "Change Password" ? changePasswordFields :
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