import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * document - document reducer
 * @param  {Array} state = [] contains initial state
 * @param  {object} action actions from the document actions
 * @return {type} returns an array
 */
export default function userReducer(
  state = initialState.manageUsers, action) {
  switch (action.type) {
  case types.LOAD_USERS_SUCCESS:
    return Object.assign({}, ...state, {
      allUsers: action.data.users.rows,
      pageCount: Math.ceil(action.data.pagination.page_count) });
  default:
    return state;
  }
}
