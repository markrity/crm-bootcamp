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
    SET_ERR,
    SET_BUISNESS,
    FINISH_LOADING
} from './types';

const CREDENTIALS_ERR = "Please Check Your Credentials"
const SERVER_ERR = "Mmm Thats Our Bad...Please Try Later"
const EMAIL_WAS_SENT = "Email Was Sent"
axios.defaults.withCredentials = true

export const chooseHallAndDate = ({ event, hallPicked }) => async dispatch => {
    dispatch({
        type: SET_HALL_AND_DATE,
        payload: { event, hallPicked }
    })
}
