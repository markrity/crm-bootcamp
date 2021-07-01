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
    employees: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

        default:
            return state

    }
}