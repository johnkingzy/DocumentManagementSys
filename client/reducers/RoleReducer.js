import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * document - document reducer
 * @param  {Array} state = [] contains initial state
 * @param  {object} action actions from the document actions
 * @return {type} returns an array
 */
export default function roleReducer(
  state = initialState.manageRoles, action) {
  switch (action.type) {
  case types.LOAD_ROLES_SUCCESS:
    return Object.assign({}, ...state, {
      roles: action.data });
  default:
    return state;
  }
}
