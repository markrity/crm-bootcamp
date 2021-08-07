import axios from 'axios';
import { GET_EMPLOYEES, UPDATE_EMPLOYEES, SET_APROVED_MSG, SET_ERR, SET_LOADING, FINISH_LOADING, SET_HALLS } from './types';

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

export const toggleMain = (hallID, buisnessID, imgID) => async dispatch => {
    try {
        console.log(hallID, imgID, buisnessID)
        const res = await axios.post('http://localhost:991/buisness/changeMainImg/',
            { buisnessID, hallID, imgID }, { withCredentials: true })
        console.log(res.data)
        dispatch({
            type: SET_HALLS,
            payload: res.data.halls
        })
    }
    catch {
        dispatch({
            type: SET_ERR,
            payload: SERVER_ERR
        })
    }
}


export const broadcastEmail = (receivers, header, body) => async dispatch => {
    try {
        console.log("In Broadcast")
        const res = await axios.post(`http://localhost:8000/broadcast/${receivers}/`,
            { header, body }, { withCredentials: true })
    }
    catch {
        dispatch({
            type: SET_ERR.length,
            payload: SERVER_ERR
        })
    }
}



export const removeHall = (hallID, buisnessID) => async dispatch => {
    try {
        console.log(hallID, buisnessID)
        const res = await axios.post('http://localhost:991/buisness/removeHall/',
            { hallID, buisnessID }, { withCredentials: true })
        console.log('Response', res.data)
        dispatch({
            type: SET_HALLS,
            payload: res.data.halls
        })
    }
    catch {
        dispatch({
            type: SET_ERR,
            payload: SERVER_ERR
        })
    }
}

export const addHall = (buisnessID, form) => async dispatch => {
    try {
        console.log(form)
        let { name, capacity, price } = form;
        name = name.value
        capacity = capacity.value
        price = price.value
        console.log(buisnessID)
        const res = await axios.post('http://localhost:991/buisness/addHall/',
            { buisnessID, form: { name, capacity, price } }, { withCredentials: true })
        console.log("Response", res.data)
        dispatch({
            type: SET_HALLS,
            payload: res.data.halls
        })
    }
    catch {
        dispatch({
            type: SET_ERR,
            payload: SERVER_ERR
        })
    }
}

export const uploadHallImg = (fd, buisnessID, hallID, fileName, isMain) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:991/buisness/uploadHallImage/',
            fd)
        if (res) {
            const res = await axios.post('http://localhost:991/buisness/updateHallImgs/',
                { buisnessID, hallID, fileName, isMain }, { withCredentials: true })
            console.log(res.data)
            dispatch({
                type: SET_HALLS,
                payload: res.data.halls
            })
        }
        else {
            dispatch({
                type: SET_ERR,
                payload: SERVER_ERR
            })
        }

    }
    catch {
        dispatch({
            type: SET_ERR,
            payload: SERVER_ERR
        })
    }


}


export const removeHallImage = (imgID, buisnessID) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:991/buisness/removeImage/',
            { imgID, buisnessID }, { withCredentials: true })
        dispatch({
            type: SET_HALLS,
            payload: res.data.halls
        })
    }
    catch {
        dispatch({
            type: SET_ERR,
            payload: SERVER_ERR
        })
    }
}

export const editHall = (form, hallID, buisnessID) => async dispatch => {
    try {
        console.log(form, hallID)
        let { name, capacity, price } = form;
        name = name.value
        capacity = capacity.value
        price = price.value
        const res = await axios.post('http://localhost:991/buisness/editHall/',
            { form: { name, capacity, price }, hallID, buisnessID }, { withCredentials: true })
        dispatch({
            type: SET_HALLS,
            payload: res.data.halls
        })

    }
    catch {
        dispatch({
            type: SET_ERR,
            payload: SERVER_ERR
        })
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
            type: SET_HALLS,
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
        console.log(buisnessID)
        const res = await axios.post('http://localhost:991/buisness/hallsInfo/', { buisnessID }, { withCredentials: true })
        console.log(res.data)
        dispatch({
            type: SET_HALLS,
            payload: res.data.halls
        })


    }
    catch {
        dispatch({
            type: SET_ERR,
            payload: SERVER_ERR
        })
    }
}

export const changeMainImg = (hallID, buisnessID, imgID) => async dispatch => {
    try {
        console.log(buisnessID)
        const res = await axios.post('http://localhost:991/buisness/changeMainImg/', { hallID, buisnessID, imgID }, { withCredentials: true })
        console.log(res.data)
        dispatch({
            type: SET_HALLS,
            payload: res.data.halls
        })
    }
    catch {
        dispatch({
            type: SET_ERR,
            payload: SERVER_ERR
        })
    }


}