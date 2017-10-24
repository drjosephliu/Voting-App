import { SHOW_FORGOT_PASSWORD_MODAL, HIDE_FORGOT_PASSWORD_MODAL } from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case SHOW_FORGOT_PASSWORD_MODAL:
      return action.payload;
    case HIDE_FORGOT_PASSWORD_MODAL:
      return action.payload;
    default:
      return state;
  }
}
