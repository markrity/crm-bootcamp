import { combineReducers } from 'redux';
import auth from './auth';
import buisness from './buisness';

export default combineReducers({
    auth, buisness
});