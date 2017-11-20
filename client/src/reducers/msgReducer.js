import { DELETE_MESSAGE, SIGNUP_ERROR, LOGIN_ERROR, FORGOT_PASSWORD_ERROR, TOKEN_ERROR, VOTE_ERROR } from '../actions/types';

const INITIAL_STATE = {
  login: null,
  signup: null,
  forgotPassword: null,
  token: null,
  vote: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP_ERROR:
      return { ...state, signup: action.payload };
    case LOGIN_ERROR:
      return { ...state, login: action.payload };
    case FORGOT_PASSWORD_ERROR:
      return { ...state, forgotPassword: action.payload };
    case TOKEN_ERROR:
      return { ...state, token: action.payload };
    case VOTE_ERROR:
      return { ...state, vote: action.payload };
    case DELETE_MESSAGE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
