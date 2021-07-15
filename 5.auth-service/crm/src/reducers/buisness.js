import {
    GET_EMPLOYEES,
    UPDATE_EMPLOYEES,
    ADD_BUISNESS,
    GET_HALLS,
    SET_BUISNESS
} from '../actions/types';


const initialState = {
    employees: [],
    buisnessID: null,
    halls: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_BUISNESS:
            return {
                ...state,
                buisnessID: payload
            }
        case ADD_BUISNESS:
            return {
                ...state,
                buisnessID: payload.buisnessID
            }
        case GET_EMPLOYEES:
            return {
                ...state,
                employees: payload.employees,
                buisnessID: payload.buisnessID
            }
        case UPDATE_EMPLOYEES:
            return {
                ...state,
                employees: payload
            }
        case GET_HALLS:
            return {
                ...state,
                halls: payload
            }
        default:
            return state

    }
}