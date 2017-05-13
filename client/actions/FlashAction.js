import ADD_FLASH_MESSAGE from './actionTypes';

/**
 * addMessage - add errors message
 * @param  {string} message error message
 * @return {object} returns an object
 */
export default function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}
