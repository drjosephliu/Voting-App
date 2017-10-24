import { FLASH_MESSAGE, DELETE_MESSAGE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FLASH_MESSAGE:
      return action.payload;
    case DELETE_MESSAGE:
      return null;
    default:
      return state;
  }
}
