import axios from 'axios';
import { GET_EMPLOYEES, UPDATE_EMPLOYEES } from './types';



axios.defaults.withCredentials = true


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
    console.log(buisnessID)

    try {
        const res = await axios.post('http://localhost:8000/buisness/removeEmployee', { id, buisnessID }, { withCredentials: true })
        console.log(res)
        dispatch({
            type: UPDATE_EMPLOYEES,
            payload: res.data
        })
    } catch {
        console.log("Unable to remove employee")
    }
}

export const inviteEmployee = (form, buisnessID) => async dispatch => {
    const email = form.email.value
    try {
        const res = await axios.post('http://localhost:8000/buisness/inviteEmployee', { email, buisnessID }, { withCredentials: true })
        dispatch({
            type: UPDATE_EMPLOYEES,
            payload: res.data
        })
    }
    catch {
        console.log("Unable to Sent Email To Employee")
    }
}
