import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    LOGOUT,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS
} from '../actions/types';


const initialState = {
    isOnline: false,
    user: null,
    err: ''
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isOnline: true,
                err: '',
                user: payload.userInfo
            }
        case LOGIN_FAIL:
            return {
                ...state,
                err: payload
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                err: '',
                user: payload.userInfo,
                isOnline: true
            }
        case SIGNUP_FAIL:
            return {
                ...state,
                err: payload
            }
        case LOGOUT:
            return {
                ...state,
                isOnline: false,
                user: null
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        default:
            return state
    }
};