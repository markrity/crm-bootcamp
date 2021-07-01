import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ADD_BUISNESS,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
} from './types';
import { Redirect } from 'react-router-dom';

axios.defaults.withCredentials = true


export const login = (formData) => async dispatch => {
    console.log(formData)
    const email = formData.email.value
    const password = formData.password.value
    const body = { email, password }
    console.log(body)
    try {
        const res = await axios.post(`http://localhost:8000/auth/login`, body, { withCredentials: true });

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
};

export const checkAuth = () => async dispatch => {
    try {
        console.log("dispatch function- checkAuth")
        const { data, status } = await axios.get('http://localhost:8000/me', {}, { withCredentials: true })
        console.log(data)
        console.log(status)
        if (status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data.userInfo
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}

export const addBuisness = (formData) => async dispatch => {
    let { buisnessName, email } = formData[0]
    let { firstName, lastName, phoneNumber, password } = formData[1]
    password = password.value
    buisnessName = buisnessName.value
    email = email.value
    firstName = firstName.value
    lastName = lastName.value
    phoneNumber = phoneNumber.value
    const buisnessInfo = { buisnessName, email }
    const adminInfo = { email, password, firstName, lastName, phoneNumber }
    console.log('buisnessInfo', buisnessInfo)
    console.log('adminInfo', adminInfo)
    try {
        const res = axios.post('http://localhost:8000/auth/addBuisness', { buisnessInfo, adminInfo }, {
            withCredentials: true
        })

        dispatch({
            type: ADD_BUISNESS,
            payload: res.data
        })
        return <Redirect to="/additionInfo" />
    } catch {
        console.log("Server Error")
    }
}


export const forgotPassword = (formData) => async dispatch => {
    try {
        await axios.post(`http://localhost:8000/auth/resetPassword/`, { email: formData.email.value }, { withCredentials: true });
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};


export const addNewEmployee = (formData) => {
    try {
        axios.post('http://localhost:8000/auth/addEmployee', formData, { withCredentials: true })
    }
    catch {
        console.log("Couldnt Add Employee")
    }
}


export const changePassword = (formData) => async dispatch => {
    const { form, token } = formData
    try {
        await axios.post(`http://localhost:8000/auth/resetPassword/`, { password: form.password.value, token }, { withCredentials: true });
    }
    catch {
        console.log("Couldnt change password")
    }
}

export const logout = () => async dispatch => {
    try {
        await axios.get('http://localhost:8000/auth/logout', {}, { withCredentials: true })
    } catch {
        console.log("Unable to logout")
    }
    dispatch({
        type: LOGOUT
    });
};
