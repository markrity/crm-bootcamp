import { combineReducers } from 'redux';
import auth from './auth';
import buisness from './buisness';
import events from './events'
import stats from './stats';

export default combineReducers({
    auth, buisness, events, stats
});