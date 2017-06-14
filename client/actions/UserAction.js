import axios from 'axios';
import types from './actionTypes';
import setAuthorizationToken from '../utils/authorization';
/**
 * action dispatched on creating new user success
 *
 * @export
 * @param {any} user
 * @returns {Object} json object
 */
export function setCurrentUser(user) {
  return { type: types.SET_CURRENT_USER, user };
}
/**
 * logout - logout Action
 * @return {Function}  dispatch an action
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
/**
//  * loadUserSuccess - load users success
 * @param  {object} data user data
 * @return {object} return an object
 */
export function loadUserSuccess(data) {
  return {
    type: types.LOAD_USERS_SUCCESS,
    data
  };
}
/**
//  * fetchUserSuccess - fetch users success
 * @param  {object} data user data
 * @return {object} return an object
 */
export function fetchUserSuccess(data) {
  return {
    type: types.FETCH_USERS_SUCCESS,
    data
  };
}
/**
//  * errorMessage - create documents action
 * @param  {object} message message to be displayed
 * @return {object} return an object
 */
export function errorMessage(message) {
  return Materialize.toast(message, 1500, 'red');
}
/**
 * loadUsers - fetches users from database
 *@param {Number} offset value
 * @return {Function} returns a dispatch
 */
export function loadUsers(offset) {
  const pageOffset = offset || 0;
  return dispatch => axios.get(`/users/?limit=8&offset=${pageOffset}`)
    .then((response) => {
      const result = response.data;
      dispatch(loadUserSuccess(result));
    })
    .catch(error =>
      dispatch(errorMessage(error.response.data.message))
    );
}
/**
 * fetchUsers - fetches users from database
 * @param {Number} userId - the user Id
 * @return {Function} returns a dispatch
 */
export function fetchUsers(userId) {
  return dispatch => axios.get(`/users/${userId}`)
    .then((response) => {
      const result = response.data;
      dispatch(fetchUserSuccess(result.user));
    })
    .catch(error =>
      dispatch(errorMessage(error.response.data.message))
    );
}
/**
 * deleteUsers - fetches users from database
 * @param {Number} userId - the user id
 * @return {Function} returns a dispatch
 */
export function deleteUser(userId) {
  return dispatch => axios.delete(`/users/${userId}`)
    .then((response) => {
      if (response.success) {
        dispatch(loadUsers());
      }
    })
    .catch(error =>
      dispatch(errorMessage(error.response.data.message))
    );
}
/**
 * editUsers - fetches users from database
 * @param {Number} userId - the user id
 * @param {Object} details the user details
 * @return {Function} returns a dispatch
 */
export function editUser(userId, details) {
  console.log(userId);
  return dispatch => axios.put(`/users/${userId}`, details)
    .then(response =>
    dispatch(fetchUserSuccess(response.data.user))
    )
    .catch(error =>
      dispatch(errorMessage(error.response.data.message))
    );
}
