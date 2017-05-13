import isEmpty from 'lodash/isEmpty';

import types from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
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
