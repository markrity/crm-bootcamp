import {
    FINISH_LOADING,
    SET_LOADING,
    SET_STATS
} from '../actions/types';


const initialState = {
    foodStats: null,
    artistsStats: null,
    hallStats: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_STATS:
            return {
                ...state,
                artistsStats: payload.artistsStats,
                hallStats: payload.hallStats
            }
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