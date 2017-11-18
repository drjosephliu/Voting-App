import { FETCH_MY_POLLS, UPDATE_POLL } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_MY_POLLS:
      return [ ...state, ...action.payload ];
    case UPDATE_POLL:
      return (
        [...state].map(poll => {
          if (poll._id === action.payload._id) {
            return action.payload;
          }
          return poll;
        })
      )
    default:
      return state;
  }
}
