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
  });
}