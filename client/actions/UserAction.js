import axios from 'axios';
import types from './actionTypes';

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
 * loadUsers - fetches users from database
 * @return {Function} returns a dispatch
 */
export function loadUsers() {
  return dispatch => axios.get('/users/')
    .then((response) => {
      const result = response.data;
      dispatch(loadUserSuccess(result));
    })
    .catch((error) => {
      throw (error);
    });
}
/**
 * fetchUsers - fetches users from database
 * @return {Function} returns a dispatch
 */
export function fetchUsers(userId) {
  return dispatch => axios.get(`/users/${userId}`)
    .then((response) => {
      const result = response.data;
      dispatch(fetchUserSuccess(result));
    })
    .catch((error) => {
      throw (error);
    });
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
    .catch((error) => {
      throw (error);
    });
}
/**
 * editUsers - fetches users from database
 * @param {Number} userId - the user id
 * @return {Function} returns a dispatch
 */
export function editUser(userId, details) {
  return dispatch => axios.put(`/users/${userId}`, details)
    .then((response) => {
      if (response.data.success) {
        dispatch(fetchUserSuccess(response.data.user));
      }
    })
    .catch((error) => {
      throw (error);
    });
}
