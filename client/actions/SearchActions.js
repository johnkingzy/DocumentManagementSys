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
 * @param {Number} offset the offset value
 * @return {Function} returns a dispatch
 */
export function searchDocuments(query, offset) {
  const pageOffset = offset || 0;
  return dispatch => axios
  .get(`/documents/search?query=${query}&limit=6&offset=${pageOffset}`)
  .then((result) => {
    dispatch(searchDocumentsSuccess(result.data));
  }).catch(error =>
    dispatch(errorMessage(error.response.data.message))
  );
}

/**
 * searchUsers - searches with users
 * @param  {String} query the searck keyword
 * @param {Number} offset the offset value
 * @return {Function} returns a dispatch
 */
export function searchUsers(query, offset) {
  const pageOffset = offset || 0;
  return dispatch => axios
  .get(`/users/search?query=${query}&limit=6&offset=${pageOffset}`)
  .then((result) => {
    dispatch(searchUsersSuccess(result.data));
  }).catch(error =>
    dispatch(errorMessage(error.response.data.message))
  );
}
