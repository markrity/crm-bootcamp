import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ADD_BUISNESS,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL
} from './types';
import { Redirect } from 'react-router-dom';

axios.defaults.withCredentials = true


export const login = (email, password) => async dispatch => {

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
    const { password, rePassword, buisnessName, email, firstName, lastName, phoneNumber } = formData
    if (password === rePassword) {
        const buisnessInfo = { buisnessName, email }
        const adminInfo = { email, password, firstName, lastName, phoneNumber }
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
}


export const resetPass = (email) => async dispatch => {

    const body = JSON.stringify({ email });

    try {
        await axios.post(`http://localhost:8000/auth/resetPassword/`, body, { withCredentials: true });

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};


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
