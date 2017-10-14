import axios from 'axios';
import { CREATE_USER, FETCH_USER } from './types';

export const createUser = (values, history) => async dispatch => {
  const res = await axios.post('/api/signup', values);
  history.push('/');

  dispatch({
    type: CREATE_USER,
    payload: res.data
  });
};

export const fetchUser = () => {
  return dispatch => {
    axios.get('/api/current_user')
      .then(res => {
        console.log('fetchuser action', res.data);
        dispatch({
          type: FETCH_USER,
          payload: res.data
        });
      });
  }
}
