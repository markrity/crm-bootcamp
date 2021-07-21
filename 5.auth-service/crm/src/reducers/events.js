import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    LOGOUT,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    CLEAN_ERR,
    BUISNESS_NAME_EXISTS,
    BUISNESS_NAME_FREE,
    SET_ERR,
    REGISTER_FAIL,
    SET_APROVED_MSG,
    FINISH_LOADING,
    SET_LOADING,
    SET_HALL_AND_DATE
} from '../actions/types';


const initialState = {
    hall: null,
    date: null,
    food: null,
    theme: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: true,
                err: "",
                approvedTxt: ""
            }
        case FINISH_LOADING:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
};