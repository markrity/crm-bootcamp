import axios from 'axios';
import { GET_EMPLOYEES, UPDATE_EMPLOYEES, SET_APROVED_MSG, SET_ERR, SET_LOADING, FINISH_LOADING, GET_HALLS } from './types';

axios.defaults.withCredentials = true
const EMAIL_WAS_SENT = "Email Was Sent"
const SERVER_ERR = "Mmm Thats Our Bad...Please Try Later"
const EMPLOYEE_REMOVED = "Employee Was Removed"
const EMPLOYEE_EDITED = "Employee Edited"
export const getEmployees = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:8000/buisness/getEmployees', {}, { withCredentials: true })
        dispatch({
            type: GET_EMPLOYEES,
            payload: res.data
        })
    } catch {
        console.log("Unable to logout")
    }
}

export const removeEmployee = (id, buisnessID) => async dispatch => {
    try {
        dispatch({ type: SET_LOADING })
        const res = await axios.post('http://localhost:8000/buisness/removeEmployee', { id, buisnessID }, { withCredentials: true })
        console.log(res)
        dispatch({
            type: UPDATE_EMPLOYEES,
            payload: res.data
        })
        dispatch({
            type: SET_APROVED_MSG,
            payload: EMPLOYEE_REMOVED
        })
    } catch {
        dispatch({
            type: SET_ERR,
            payload: SERVER_ERR
        })
    }
}

export const inviteEmployee = (form, buisnessID) => async dispatch => {
    const email = form.email.value
    try {
        dispatch({ type: SET_LOADING })
        const res = await axios.post('http://localhost:8000/buisness/inviteEmployee', { email, buisnessID }, { withCredentials: true })
        dispatch({
            type: SET_APROVED_MSG,
            payload: EMAIL_WAS_SENT
        })
        dispatch({
            type: UPDATE_EMPLOYEES,
            payload: res.data
        })
    }
    catch {
        console.log("ERRRRRR")
        dispatch({
            type: SET_ERR,
            payload: SERVER_ERR
        })
    }
}
export const editEmployee = (employeeID, form, buisnessID) => async dispatch => {
    console.log(form)
    console.log(employeeID)
    try {
        dispatch({ type: SET_LOADING })
        const res = await axios.post('http://localhost:8000/buisness/editEmployee', { employeeID, form, buisnessID }, { withCredentials: true })
        dispatch({
            type: UPDATE_EMPLOYEES,
            payload: res.data
        })
        dispatch({
            type: SET_APROVED_MSG,
            payload: EMPLOYEE_EDITED
        })
    } catch {
        dispatch({
            type: SET_ERR,
            payload: SERVER_ERR
        })
    }
}

export const getHalls = (buisnessID) => async dispatch => {
    try {
        console.log(buisnessID)
        const res = await axios.post('http://localhost:991/buisness/getHalls/', { buisnessID }, { withCredentials: true })
        console.log(res)
        dispatch({
            type: GET_HALLS,
            payload: res.data.halls
        })
    } catch {
        dispatch({
            type: SET_ERR,
            payload: SERVER_ERR
        })
    }
}

export const getHallsInformation = (buisnessID) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:991/buisness/getHallsInfo/', { buisnessID }, { withCredentials: true })
        console.log(res)
        // dispatch({
        //     type: GET_HALLS,
        //     payload: res.data.halls
        // })

    }
    catch {
        dispatch({
            type: SET_ERR,
            payload: SERVER_ERR
        })
    }


}