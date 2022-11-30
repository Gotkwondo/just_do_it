import { combineReducers } from 'redux';
import auth from './auth.js';
import loading from './loading.js';

const rootReducer = combineReducers({
  auth,
  loading
});

export default rootReducer;