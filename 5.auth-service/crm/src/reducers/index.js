import { combineReducers } from 'redux';
import auth from './auth';
import buisness from './buisness';
import events from './events'

export default combineReducers({
    auth, buisness, events
});