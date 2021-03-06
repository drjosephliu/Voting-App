import axios from 'axios';
import {
  FETCH_USER,
  DELETE_MESSAGE,
  SHOW_FORGOT_PASSWORD_MODAL,
  HIDE_FORGOT_PASSWORD_MODAL,
  SIGNUP_ERROR,
  LOGIN_ERROR,
  FORGOT_PASSWORD_ERROR,
  TOKEN_ERROR,
  CREATE_POLL,
  FETCH_MY_POLLS,
  FETCH_MORE_MY_POLLS,
  UPDATE_POLL,
  VOTE_ERROR,
  FETCH_ALL_POLLS,
  FETCH_MORE_ALL_POLLS,
  DELETE_POLL,
  NO_MORE_ALL_POLLS,
  NO_MORE_MY_POLLS
} from './types';

export const createUser = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/signup', values);

    dispatch(deleteMessage());
    history.push('/');
    window.Materialize.toast(res.data, 4000);
  }
  catch(err) {
    dispatch(signUpError(err.response.data));
  }
};


export const deleteMessage = () => {
  return { type: DELETE_MESSAGE };
}

export const signUpError = msg => {
  return { type: SIGNUP_ERROR, payload: msg };
}

export const loginError = msg => {
  return { type: LOGIN_ERROR, payload: msg };
}

export const forgotPasswordError = msg => {
  return { type: FORGOT_PASSWORD_ERROR, payload: msg };
}

export const tokenError = msg => {
  return { type: TOKEN_ERROR, payload: msg };
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
    window.Materialize.toast(`Welcome back ${res.data.local.email}!`, 4000);
  }
  catch(err) {
    dispatch(loginError(err.response.data));
  }
}

export const showForgotPasswordModal = () => async dispatch => {
  dispatch({ type: SHOW_FORGOT_PASSWORD_MODAL, payload: true });
}

export const hideForgotPasswordModal = () => async dispatch => {
  dispatch({ type: HIDE_FORGOT_PASSWORD_MODAL, payload: false });
}

export const forgotPassword = values => async dispatch => {
  console.log('values:', values);
  try {
    const res = await axios.post('/api/forgot', values);
    dispatch(deleteMessage());
    dispatch(hideForgotPasswordModal());
    window.Materialize.toast(res.data, 4000);
  }
  catch(err) {
    dispatch(forgotPasswordError(err.response.data));
  }
}

export const checkResetToken = (email, token) => async dispatch => {

  try {
    await axios.get(`/api/reset/${email}/${token}`);
    dispatch(deleteMessage());
  }
  catch(err) {
    dispatch(tokenError(err.response.data));
  }
}

export const resetPassword = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/reset', values);
    history.push('/');

    dispatch(deleteMessage());
    dispatch({ type: FETCH_USER, payload: res.data });
    window.Materialize.toast('Password successfully changed', 4000);
  }
  catch(err) {
    dispatch(tokenError(err.response.data));
  }
}

export const checkVerificationToken = (email, token, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/verify/${email}/${token}`);

    history.push('/');
    dispatch(deleteMessage());
    dispatch({ type: FETCH_USER, payload: res.data });
    window.Materialize.toast(`Welcome ${email} !`, 4000);
  }
  catch(err) {
    console.log(err.response.data);
    dispatch(tokenError(err.response.data));
  }
}

export const resendVerificationToken = email => async dispatch => {
  try {
    const res = await axios.post('/api/verify', email);
    dispatch(deleteMessage());
    window.Materialize.toast(res.data, 4000);
  }
  catch(err) {
    dispatch(tokenError(err.response.data));
  }
}

export const submitPoll = (values, history) => async dispatch => {
  const res = await axios.post('/api/polls', values);
  history.push('/mypolls');
  dispatch({ type: CREATE_POLL, payload: res.data });
}

export const fetchMyPolls = skip => async dispatch => {
  const res = await axios.get(`/api/mypolls/${skip}`);

  dispatch({ type: FETCH_MY_POLLS, payload: res.data });
}

export const fetchMoreMyPolls = skip => async dispatch => {
  const res = await axios.get(`/api/mypolls/${skip}`);

  if (res.data.length === 0) dispatch(noMoreMyPolls());
  dispatch({ type: FETCH_MORE_MY_POLLS, payload: res.data });
}

export const submitVote = vote => async dispatch => {
  try {
    const res = await axios.post('/api/poll', vote);
    dispatch(voteError(false));
    dispatch ({ type: UPDATE_POLL, payload: res.data });
    dispatch(deleteMessage());
  }
  catch(err) {
    // dispatch(voteError(err.response.data));
    window.Materialize.toast(err.response.data, 1000);
  }
}

export const voteError = msg => {
  return { type: VOTE_ERROR, payload: msg };
}

export const fetchAllPolls = skip => async dispatch => {
  const res = await axios.get(`/api/allpolls/${skip}`);

  dispatch({ type: FETCH_ALL_POLLS, payload: res.data });
}

export const fetchMoreAllPolls = skip => async dispatch => {
  const res = await axios.get(`/api/allpolls/${skip}`);

  if (res.data.length === 0) dispatch(noMoreAllPolls());
  dispatch({ type: FETCH_MORE_ALL_POLLS, payload: res.data });
}

export const deletePoll = id => async dispatch => {
  const res = await axios.delete(`/api/poll/${id}`);
  console.log('res:', res.data);
  dispatch({ type: DELETE_POLL, payload: res.data });
}

export const noMoreAllPolls = () => {
  return { type: NO_MORE_ALL_POLLS, payload: true };
}

export const noMoreMyPolls = () => {
  return { type: NO_MORE_MY_POLLS, payload: true };
}
