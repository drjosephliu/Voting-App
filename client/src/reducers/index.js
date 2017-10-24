import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import msgReducer from './msgReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  form: reduxForm,
  auth: authReducer,
  msg: msgReducer,
  modal: modalReducer,
});
