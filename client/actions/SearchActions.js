import axios from 'axios';
import types from './actionTypes';


/**
 * searchDocumentsSuccess - search dcouments sucess
 * @param  {object} result contains the search result
 * @return {Object}  returns an object
 */
export function searchDocumentsSuccess(result) {
  return {
    type: types.SEARCH_DOCUMENTS_SUCCESS,
    result
  };
}

/**
//  * errorMessage - create documents action
 * @param  {object} message message to be displayed
 * @return {object} return an object
 */
export function errorMessage(message) {
  return Materialize.toast(message, 1000, 'red');
}

/**
 * searchUsersSuccess - search users successs
 * @param  {Object} result contains the search result
 * @return {Object} returns an objetc
 */
export function searchUsersSuccess(result) {
  return {
    type: types.SEARCH_USERS_SUCCESS,
    result
  };
}

/**
 * searchDocuments - search withinn documents
 * @param  {String} query the search keyword
 * @return {Function} returns a dispatch
 */
export function searchDocuments(query) {
  return dispatch => axios.get(`/documents/search?query=${query}`)
  .then((result) => {
    dispatch(searchDocumentsSuccess(result.data));
  }).catch(() => {
    dispatch(errorMessage('An error occured while retrieving results'));
  });
}

/**
 * searchUsers - searches with users
 * @param  {String} query the searck keyword
 * @return {Function} returns a dispatch
 */
export function searchUsers(query) {
  return dispatch => axios.get(`/users/search?query=${query}`)
  .then((result) => {
    dispatch(searchUsersSuccess(result.data));
  }).catch(() => {
    dispatch(errorMessage('An error occured while retrieving results'));
  });
}
