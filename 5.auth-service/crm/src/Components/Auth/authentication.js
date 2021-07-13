import React, { useState } from 'react'
import AuthForm from './AuthForm'
import Header from '../Header';
import Card from '../Card';
import './authentication.css'
import {
    newBuisnessFormFields, loginFormFields,
    signupFormFields, forgotPasswordFields, changePasswordFields,
    newEmployee
} from '../../scripts/formFields'

const Auth = ({ initMode }) => {

    const [mode, setMode] = useState(initMode ?? 'New Buisness')
    const formFields = () => {
        switch (mode) {
            case "New Buisness":
                return newBuisnessFormFields
            case "Add Employee":
                return signupFormFields
            case "Reset Password":
                return forgotPasswordFields
            case "Change Password":
                return changePasswordFields
            case "Employee Registration":
                return newEmployee
            case "Login":
                return loginFormFields
            default:
                return []
        }
    }
    const authForm = <AuthForm mode={mode} setMode={setMode} formFields={formFields()} />
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