import React, { useState } from 'react'
import axios from axios
import CustomInput from './CustomInput';
import FormFooter from './AuthFormFooter';

const AuthForm = () => {
    const [isSignup, setIsSignUp] = useState(true)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        re_password: ''
    });

    const { email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const login = () => {
        axios.post('localhost:127.0.0.1:8000/login', { email, password })

    }

    const signup = () => {
        if (password === re_password) {
            console.log('same pass')
            axios.post('localhost:127.0.0.1:8000/signup', { email, password })
        }


    }

    const onSubmit = e => {
        e.preventDefault();
        isSignup ? signup() : login()

    };

    return (
        <div className='default'>
            <form onSubmit={e => onSubmit(e)}>
                <CustomInput type='email'
                    placeholder='Email*'
                    name='email'
                    value={email}
                    onChangeFunc={e => onChange(e)} />
                <CustomInput type='password'
                    placeholder='Password*'
                    name='password'
                    value={password}
                    onChangeFunc={e => onChange(e)}
                    minLength='6'
                />{
                    isSignup &&
                    <CustomInput type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChangeFunc={e => onChange(e)}
                        minLength='6' />
                }
                <button type='submit' >Register</button>
            </form>
            <FormFooter isSignup={isSignup} setIsSignup={setIsSignUp} />
        </div>
    )
}

export default AuthForm