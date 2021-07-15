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
    SET_LOADING
} from '../actions/types';


const initialState = {
    isOnline: false,
    user: null,
    err: '',
    approvedTxt: '',
    isLoading: true
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
        case SET_APROVED_MSG:
            return {
                ...state,
                isLoading: false,
                approvedTxt: payload,
                err: ""
            }
        case REGISTER_FAIL:
            return {
                ...state,
                approvedTxt: "",
                err: payload
            }
        case BUISNESS_NAME_EXISTS:
            return {
                ...state,
                approvedTxt: "",
                err: "Buisness Name Already Exists"

            }
        case BUISNESS_NAME_FREE:
            return {
                ...state,
                err: "",
                approvedTxt: "Buisness Name Is Available"
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isOnline: true,
                err: '',
                user: payload,
                isLoading: false
            }
        case SET_ERR:
            return {
                ...state,
                approvedTxt: "",
                isLoading: false,
                err: payload
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
        case CLEAN_ERR:
            return {
                ...state,
                err: "",
                approvedTxt: "",
                isLoading: false
            }
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                err: "",
                approvedTxt: payload
            }
        case PASSWORD_RESET_FAIL:
        default:
            return state
    }
};