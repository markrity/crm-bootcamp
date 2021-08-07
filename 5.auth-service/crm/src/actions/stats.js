import axios from 'axios';
import {
    SET_STATS,
    SET_ERR
} from './types';

const CREDENTIALS_ERR = "Please Check Your Credentials"
const SERVER_ERR = "Mmm Thats Our Bad...Please Try Later"
const EMAIL_WAS_SENT = "Email Was Sent"
axios.defaults.withCredentials = true

export const getStats = (month) => async dispatch => {
    try {
        console.log("Getting Stats")
        console.log(month)
        const { data } = await axios.post(`http://localhost:991/stats/getMonthStats/`,
            { month }, { withCredentials: true })
        console.log("Result", data)
        dispatch({
            type: SET_STATS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: SET_ERR,
            payload: err.response ? err.response.status === 401 ?
                CREDENTIALS_ERR : SERVER_ERR : SERVER_ERR
        })
    }
}
