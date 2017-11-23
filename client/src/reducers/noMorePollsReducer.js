import {
  NO_MORE_ALL_POLLS,
  NO_MORE_MY_POLLS
} from '../actions/types';

const INITIAL_STATE = {
  myPolls: false,
  allPolls: false
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case NO_MORE_ALL_POLLS:
      return { ...state, allPolls: action.payload };
    case NO_MORE_MY_POLLS:
      return { ...state, myPolls: action.payload };
    default:
      return state;
  }
}
