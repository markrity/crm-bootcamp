import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import CustomInput from './CustomInput';
import FormFooter from './AuthFormFooter';
import ClickableTxt from './ClickableTxt';
import { Redirect } from 'react-router';
import { addBuisness, login } from '../actions/auth';

const AuthForm = ({ isNewUser, isNewBuisness, setIsNewBuisness }) => {

    const dispatch = useDispatch()
    const signupFormFields = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        re_password: ''
    }

    const loginFormFields = {
        email: '',
        password: ''
    }

    const newBuisnessFormFields = {
        buisnessName: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        re_password: ''
    }

    const [formStage, setFormStage] = useState(1)
    const [formData, setFormData] = useState(isNewBuisness ? newBuisnessFormFields : isNewUser ? signupFormFields : loginFormFields);

    const { buisnessName, email, firstName, lastName, phoneNumber, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    const addNewUser = () => {
        if (password === re_password) {
            console.log('same pass')
            axios.post('http://localhost:8000/auth/signup', { email, password }, { withCredentials: true })
        }
        if (isNewBuisness)
            return <Redirect to="/additionInfo" />
        return <Redirect to="/" />
    }

    const onSubmit = e => {
        e.preventDefault();
        isNewBuisness ? dispatch(addBuisness(formData)) : isNewUser ? addNewUser() : dispatch(login(email, password))
    };


    const userForm = (disableEmail) => {
        return (
            <>
                <CustomInput type='email'
                    placeholder='Email*'
                    name='email'
                    lbl='Email'
                    value={email}
                    disabled={disableEmail}
                    onChangeFunc={e => onChange(e)}
                />

                <CustomInput type='password'
                    placeholder='Password*'
                    name='password'
                    lbl='Password'
                    value={password}
                    onChangeFunc={e => onChange(e)}
                    minLength='6'
                />{
                    (isNewUser || isNewBuisness) ?
                        <>
                            <CustomInput type='password'
                                placeholder='Confirm Password*'
                                name='re_password'
                                lbl='Resend Password'
                                value={re_password}
                                onChangeFunc={e => onChange(e)}
                                minLength='6' />
                            <CustomInput type='text'
                                placeholder='First Name*'
                                name='firstName'
                                lbl='First Name'
                                value={firstName}
                                onChangeFunc={e => onChange(e)}
                            />
                            <CustomInput type='text'
                                placeholder='Last Name*'
                                name='lastName'
                                lbl='Last Name'
                                value={lastName}
                                onChangeFunc={e => onChange(e)}
                            />
                            <CustomInput type='text'
                                placeholder='Phone Number*'
                                name='phoneNumber'
                                lbl='Phone Number'
                                value={phoneNumber}
                                onChangeFunc={e => onChange(e)}
                            />
                            <button type='submit'>Register</button>
                        </>
                        :
                        <button type='submit'>Login</button>
                }
                {formStage === 1 ?
                    <FormFooter isNewBuisness={isNewBuisness} setIsNewBuisness={setIsNewBuisness} /> :
                    <ClickableTxt txt="Back" onClickFunc={() => setFormStage(formStage - 1)} />
                }
            </>
        )
    }

    const newBuisnessForm = () => {
        return (
            formStage === 1 ?
                <>
                    <CustomInput type='text'
                        placeholder='Buisness Name*'
                        name='buisnessName'
                        lbl='Buisness Name'
                        value={buisnessName}
                        onChangeFunc={e => onChange(e)} />
                    <CustomInput type='text'
                        placeholder='email*'
                        name='email'
                        lbl='Email'
                        value={email}
                        onChangeFunc={e => onChange(e)} />
                    <button onClick={() => setFormStage(formStage + 1)}>Add My Buisness</button>
                    <FormFooter isNewBuisness={isNewBuisness} setIsNewBuisness={setIsNewBuisness} />
                </> :
                <>
                    <h1>Set Main Account</h1>
                    {userForm(true)}
                </>
        )
    }


    return (
        <div className='default'>
            <form onSubmit={e => onSubmit(e)}>
                {isNewBuisness ? newBuisnessForm() : userForm()}
            </form>

        </div>
    )
}



export default AuthForm