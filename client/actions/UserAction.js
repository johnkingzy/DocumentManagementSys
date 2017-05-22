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
 * deleteUsers - fetches users from database
 * @param {Number} userId - the user id
 * @return {Function} returns a dispatch
 */
export function deleteUser(userId) {
  return dispatch => axios.delete(`/users/${userId}`)
    .then((response) => {
      const result = response.data;
      dispatch(loadUserSuccess(result));
    })
    .catch((error) => {
      throw (error);
    });
}
