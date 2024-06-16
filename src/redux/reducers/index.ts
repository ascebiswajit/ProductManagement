// reducers/index.js
import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import productReducer from './productReducer';
import loginReducer from './loginReducer';

export default combineReducers({
  signup: signupReducer,
  login: loginReducer,
  products: productReducer,
});
