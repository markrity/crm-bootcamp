import axios from 'axios';
import additionInfo from '../Screens/additionalInfo';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ADD_BUISNESS,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    // AUTHENTICATED_SUCCESS,
    // AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL
    // PASSWORD_RESET_CONFIRM_SUCCESS,
    // PASSWORD_RESET_CONFIRM_FAIL,
    // SIGNUP_SUCCESS,
    // SIGNUP_FAIL,
    // ACTIVATION_SUCCESS,
    // ACTIVATION_FAIL,
    // // LOGOUT,
    // REFRESH_USER
} from './types';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useHistory } from 'react-router-dom';

axios.defaults.withCredentials = true


// export const checkAuthenticated = () => async dispatch => {
//     if (localStorage.getItem('access')) {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//                 "Access-Control-Allow-Origin": "*"
//             }
//         };

//         const body = JSON.stringify({ token: localStorage.getItem('access') });

//         try {
//             const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

//             if (res.data.code !== 'token_not_valid') {
//                 dispatch({
//                     type: AUTHENTICATED_SUCCESS
//                 });
//             } else {
//                 dispatch({
//                     type: AUTHENTICATED_FAIL
//                 });
//             }
//         } catch (err) {
//             dispatch({
//                 type: AUTHENTICATED_FAIL
//             });
//         }

//     } else {
//         dispatch({
//             type: AUTHENTICATED_FAIL
//         });
//     }
// };

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
    catch {
        console.log("error")
    }
}

export const addBuisness = (formData) => async dispatch => {
    const { password, rePassword, buisnessName, email, firstName, lastName, phoneNumber } = formData
    if (password === rePassword) {
        const buisnessInfo = { buisnessName, email }
        const adminInfo = { email, password, firstName, lastName, phoneNumber }
        axios.post('http://localhost:8000/auth/addBuisness', { buisnessInfo, adminInfo }, {
            withCredentials: true
        })
        return <Redirect to="/additionInfo" />
    }
    else
        console.log('passwords dont match')
}

// export const signup = (name, email, password, re_password) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             "Access-Control-Allow-Origin": "*"
//         }
//     };

//     const body = JSON.stringify({ name, email, password, re_password });

//     try {
//         const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

//         dispatch({
//             type: SIGNUP_SUCCESS,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: SIGNUP_FAIL
//         })
//     }
// };

// export const verify = (uid, token) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             "Access-Control-Allow-Origin": "*"
//         }
//     };

//     const body = JSON.stringify({ uid, token });

//     try {
//         await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

//         dispatch({
//             type: ACTIVATION_SUCCESS,
//         });
//     } catch (err) {
//         dispatch({
//             type: ACTIVATION_FAIL
//         })
//     }
// };

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

// export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             "Access-Control-Allow-Origin": "*"
//         }
//     };

//     const body = JSON.stringify({ uid, token, new_password, re_new_password });

//     try {
//         await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

//         dispatch({
//             type: PASSWORD_RESET_CONFIRM_SUCCESS
//         });
//     } catch (err) {
//         dispatch({
//             type: PASSWORD_RESET_CONFIRM_FAIL
//         });
//     }
// };

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

// export const refresh_user = (network) => dispatch => {
//     dispatch({
//         type: REFRESH_USER,
//         payload: network
//     })
// }