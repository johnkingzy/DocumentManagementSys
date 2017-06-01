import types from '../actions/actionTypes';
import initialState from './initialState';


const SearchReducer = (
  state = initialState.manageSearch, action) => {
  switch (action.type) {
  case types.SEARCH_DOCUMENTS_SUCCESS:
    return Object.assign({}, state, {
      searchedDocuments: action.result.documents.rows,
      searchedPageCount: action.result.pagination.page_count });
  case types.SEARCH_USERS_SUCCESS:
    return Object.assign({}, state, {
      searchedUsers: action.result.users.rows,
      searchedPageCount: action.result.pagination.page_count });
  default:
    return state;
  }
};
export default SearchReducer;
