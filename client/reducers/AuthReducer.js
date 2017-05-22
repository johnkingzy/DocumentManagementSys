import isEmpty from 'lodash/isEmpty';
import initialState from './initialState';
import types from '../actions/actionTypes';

export default (state = initialState.loggedInUser, action = {}) => {
  switch (action.type) {
  case types.SET_CURRENT_USER:
    return {
      isAuthenticated: !isEmpty(action.user),
      user: action.user
    };
  default:
    return state;
  }
};
