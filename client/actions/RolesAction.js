import axios from 'axios';
import types from './actionTypes';

/**
//  * loadRoleSuccess - load role success
 * @param  {object} data user data
 * @return {object} return an object
 */
export function loadRoleSuccess(data) {
  return {
    type: types.LOAD_ROLES_SUCCESS,
    data
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
 * loadRoles - fetches role from database
 * @return {Function} returns a dispatch
 */
export function loadRoles() {
  return dispatch => axios.get('/roles/')
    .then((response) => {
      const result = response.data;
      dispatch(loadRoleSuccess(result.roles));
    })
    .catch(error =>
      dispatch(errorMessage(error.response.data.message))
    );
}

/**
 * updateRoles - fetches role from database
 * @param {Object} data document's details
 * @param {Number} id document's ID
 * @return {Function} returns a dispatch
 */
export function updateRole(data, id) {
  return dispatch => axios.put(`/users/${id}`, data)
    .then(() => {
      dispatch(loadRoles());
    })
    .catch(error =>
      dispatch(errorMessage(error.response.data.message))
    );
}

/**
 * addRole - create a new role
 * @param  {object} data contains the role data
 * @return {Function} returns a dispatch
 */
export function addRole(data) {
  return dispatch => axios.post('/roles', data)
    .then(() => {
      dispatch(loadRoles());
    })
    .catch(error =>
      dispatch(errorMessage(error.response.data.message))
    );
}
