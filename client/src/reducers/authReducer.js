import { CREATE_USER, FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.payload;
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
