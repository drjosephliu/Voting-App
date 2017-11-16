import { FETCH_MY_POLLS } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_MY_POLLS:
      return [ ...state, ...action.payload ];
    default:
      return state;
  }
}
