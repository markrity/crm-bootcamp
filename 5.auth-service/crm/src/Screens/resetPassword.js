import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import CustomInput from '../Components/CustomInput'
import { resetPass } from '../actions/auth'
import { Redirect, Route, useHistory } from 'react-router';
import ClickableTxt from '../Components/ClickableTxt';


const ResetPassword = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const OnSubmit = e => {
        e.preventDefault();
        dispatch(resetPass(email));
    };


    return (
        <>
            <h1>Enter Password</h1>
            <form onSubmit={e => OnSubmit(e)}>
                <CustomInput type='text'
                    placeholder='email*'
                    name='email'
                    lbl='Email'
                    value={email}
                    onChangeFunc={e => onChange(e)} />
                <button type='submit'>Send Email</button>
            </form>
            <ClickableTxt txt="Back" onClickFunc={() => history.goBack()} />
        </>
    )

}

export default ResetPassword