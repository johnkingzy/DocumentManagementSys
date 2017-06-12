import axios from 'axios';
import jwtDecode from 'jwt-decode';
import omit from 'lodash/omit';

import types from './actionTypes';
import setAuthorizationToken from '../utils/authorization';

/**
 * isUserExists to check if passed parameter already exist in the db
 * using the route GET /api/users/:identifier
 *
 * @export
 * @param {any} identifier
 * @returns {objeect} uuser
 */
export function isUserExists(identifier) {
  return () => axios.get(`/users/verify/${identifier}`);
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
 * action dispatched on creating new user success
 *
 * @export
 * @param {any} user
 * @returns {Object} json object
 */
export function createUserSuccess(user) {
  return {
    type: types.CREATE_USER_SUCCESS,
    user
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
 * SignUp - SignUp Action
 * @param  {object} userDetails contains the user details
 * @return {object} return an object
 */
export function saveUserDetails(userDetails) {
  return dispatch => axios.post('/users', userDetails)
    .then((result) => {
      const token = result.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      const decodedData = jwtDecode(token);
      const decoded = omit(decodedData.user, [
        'password',
        'createdAt',
        'updatedAt'
      ]);
      dispatch(setCurrentUser(decoded));
    }).catch(error =>
      dispatch(errorMessage(error.response.data.message))
    );
}

/**
 * loginRequest - Handles login request
 * @param  {object} userDetails contain user login details
 * @return {void} no return or void
 */
export function loginRequest(userDetails) {
  return dispatch => axios.post('/users/login', userDetails)
  .then((res) => {
    const token = res.data.token;
    const details = jwtDecode(token);
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    const decoded = omit(details.user, [
      'password',
      'createdAt',
      'updatedAt'
    ]);
    dispatch(setCurrentUser(decoded));
  }).catch(error =>
    dispatch(errorMessage(error.response.data.message))
  );
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
