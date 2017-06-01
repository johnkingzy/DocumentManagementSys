import shortid from 'shortid';
import { ADD_FLASH_MESSAGE } from '../actions/actionTypes';

/**
 * flashMessage - flash message reducer
 * @param  {Array} state = [] initial state
 * @param  {Object} action dispatched action
 * @return {Array} returns array
 */
export default (state = [], action) => {
  switch (action.type) {
  case ADD_FLASH_MESSAGE:
    return [
      ...state,
      {
        id: shortid.generate(),
        type: action.messsage.type,
        text: action.message.text
      }
    ];
  default:
    return state;
  }
};
