import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ADD_BUISNESS,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
} from './types';
import { Redirect, useHistory } from 'react-router-dom';


axios.defaults.withCredentials = true


export const login = (formData) => async dispatch => {
    // const history = useHistory()
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
            type: LOGIN_FAIL,
            payload: "Your Password Or Email Are Incorrect"
        })
    }
};

export const checkAuth = () => {
    return async (dispatch, getState) => {
        try {
            const { data, status } = await axios.get('http://localhost:8000/me', {}, { withCredentials: true })
            if (status === 200) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: data
                })
            }
        }
        catch (err) {
            console.log(err)
        }
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
        console.log("Sent resetPassword")
        await axios.post(`http://localhost:8000/auth/resetPassword`, { email: formData.email.value }, { withCredentials: true });
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};


export const addNewEmployee = (formData, buisnessID, email) => async dispatch => {

    let { firstName, lastName, phoneNumber, password } = formData
    password = password.value
    firstName = firstName.value
    lastName = lastName.value
    phoneNumber = phoneNumber.value
    const employeeInfo = { password, firstName, lastName, phoneNumber, email, buisnessID }
    console.log(employeeInfo)
    try {
        const res = await axios.post('http://localhost:8000/auth/addEmployee', employeeInfo, { withCredentials: true })

    }
    catch {
        console.log("Couldnt Add Employee")
    }
}

export const finishVerification = (token) => async dispatch => {
    try {
        console.log(token)
        const { data } = await axios.post('http://localhost:8000/auth/verification', { token }, { withCredentials: true })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
    }
    catch {
        console.log("verification Failed")
    }
}


export const changePassword = (formData) => async dispatch => {
    console.log(formData)
    const { form, token } = formData
    try {
        await axios.post(`http://localhost:8000/auth/changePassword`, { password: form.password.value, token }, { withCredentials: true });
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


