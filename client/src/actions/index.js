import axios from 'axios';
import { CREATE_USER, FETCH_USER, FLASH_MESSAGE, DELETE_MESSAGE, SHOW_FORGOT_PASSWORD_MODAL, HIDE_FORGOT_PASSWORD_MODAL } from './types';

export const createUser = (values, history) => async dispatch => {

  try {
    const res = await axios.post('/api/signup', values);

    dispatch(deleteMessage());
    dispatch({ type: CREATE_USER, payload: res.data });
    history.push('/');
    window.Materialize.toast(res.data.msg, 4000);
  }
  catch(err) {
    dispatch(flashMessage('Email has already been taken.'));
  }
};

export const flashMessage = msg => {
  return { type: FLASH_MESSAGE, payload: msg };
};

export const deleteMessage = () => {
  return { type: DELETE_MESSAGE };
}


export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
}

export const loginUser = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/login', values);
    dispatch(deleteMessage());
    dispatch({ type: FETCH_USER, payload: res.data });
    history.push('/');
    window.Materialize.toast(res.data.msg, 4000);
  }
  catch(err) {
    dispatch(flashMessage('Invalid email or password.'));
  }
}

export const showForgotPasswordModal = () => async dispatch => {
  dispatch({ type: SHOW_FORGOT_PASSWORD_MODAL, payload: true });
}

export const hideForgotPasswordModal = () => async dispatch => {
  dispatch({ type: HIDE_FORGOT_PASSWORD_MODAL, payload: false });
}

export const forgotPassword = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/forgot', values);
    console.log('res:', res.data);
    dispatch(deleteMessage());
    dispatch(hideForgotPasswordModal());
    window.Materialize.toast(res.data, 4000);
  }
  catch(err) {
    console.log('err:', err);
    dispatch(flashMessage('No account with that email address exists'));
  }
}

export const checkToken = (email, token) => async dispatch => {

  try {
    const res = await axios.get(`/api/reset/${email}/${token}`);
    console.log('token check', res);
  }
  catch(err) {
    console.log(err);
    dispatch(flashMessage('Invalid token or token has expired'));
  }
}

export const resetPassword = (values) => async dispatch => {
  const res = await axios.post('/api/reset', values);
}
