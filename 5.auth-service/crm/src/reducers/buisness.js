import {
    GET_EMPLOYEES,
    UPDATE_EMPLOYEES
} from '../actions/types';


const initialState = {
    employees: [],
    buisnessID: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
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
        default:
            return state

    }
}