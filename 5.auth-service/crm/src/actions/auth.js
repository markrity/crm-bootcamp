import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ADD_BUISNESS,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    REGISTER_FAIL,
    CLEAN_ERR,
    BUISNESS_NAME_EXISTS,
    BUISNESS_NAME_FREE,
    SET_ERR
} from './types';

const CREDENTIALS_ERR = "Please Check Your Credentials"
const SERVER_ERR = "Mmm Thats Our Bad...Please Try Later"
const EMAIL_WAS_SENT = "Email Was Sent"
axios.defaults.withCredentials = true

export const checkBuisnessName = (buisnessName) => async dispatch => {
    console.log("in checkBuisness Name")
    try {
        console.log("in checkBuisness Name")
        const res = await axios.post(`http://localhost:8000/auth/checkBuisnessName`, { buisnessName }, { withCredentials: true });
        console.log(res.status)
        dispatch({ type: BUISNESS_NAME_FREE })
    } catch (err) {
        if (err.response) {
            if (err.response.status === 500)
                dispatch({ type: SET_ERR, payload: SERVER_ERR })
            else
                dispatch({ type: BUISNESS_NAME_EXISTS })
        }
        else
            dispatch({ type: SET_ERR, payload: SERVER_ERR })
    }
}

export const login = (formData) => async dispatch => {
    const email = formData.email.value
    const password = formData.password.value
    const body = { email, password }
    try {
        const res = await axios.post(`http://localhost:8000/auth/login`, body, { withCredentials: true });
        console.log(res)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.userInfo
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response ? err.response.status === 401 ?
                CREDENTIALS_ERR : SERVER_ERR : SERVER_ERR
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
            dispatch({
                type: CLEAN_ERR,
            })
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
    try {
        const res = await axios.post('http://localhost:8000/auth/addBuisness', { buisnessInfo, adminInfo }, {
            withCredentials: true
        })
        console.log('res', res.data)
        dispatch({
            type: ADD_BUISNESS,
            payload: res.data.buisness
        })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.user
        })
    }
    catch (err) {
        console.log('err', err)
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response ? err.response.status === 401 ?
                CREDENTIALS_ERR :
                SERVER_ERR : SERVER_ERR
        })
    }
}

export const forgotPassword = (formData) => async dispatch => {
    try {
        await axios.post(`http://localhost:8000/auth/resetPassword`, { email: formData.email.value }, { withCredentials: true });
        dispatch({
            type: PASSWORD_RESET_SUCCESS,
            payload: EMAIL_WAS_SENT
        });
    } catch (err) {
        dispatch({
            type: SET_ERR,
            payload: err.response ? err.response.status === 401 ?
                CREDENTIALS_ERR : SERVER_ERR : SERVER_ERR
        })
    }
};


export const addNewEmployee = (formData, buisnessID, email) => async dispatch => {

    let { firstName, lastName, phoneNumber, password } = formData
    password = password.value
    firstName = firstName.value
    lastName = lastName.value
    phoneNumber = phoneNumber.value
    const employeeInfo = { password, firstName, lastName, phoneNumber, email, buisnessID }
    try {
        const res = await axios.post('http://localhost:8000/auth/addEmployee', employeeInfo, { withCredentials: true })
    }
    catch {
        console.log("Couldnt Add Employee")
    }
}

export const finishVerification = (token) => async dispatch => {
    try {
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

export const cleanErr = () => async dispatch => {
    dispatch({
        type: CLEAN_ERR
    })
}

export const setErr = (message) => async dispatch => {
    dispatch({ type: SET_ERR, payload: message })
}