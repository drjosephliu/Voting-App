import {
  CREATE_POLL,
  FETCH_MY_POLLS,
  FETCH_MORE_MY_POLLS,
  DELETE_POLL
} from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_MY_POLLS:
      return [ ...action.payload ];
    case FETCH_MORE_MY_POLLS:
      return [ ...state, ...action.payload ];
    case CREATE_POLL:
      return [ ...action.payload, ...state ];
    case DELETE_POLL:
      return [ ...state ].filter(poll => poll._id !== action.payload._id);
    default:
      return state;
  }
}
