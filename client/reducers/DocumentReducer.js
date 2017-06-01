import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * document - document reducer
 * @param  {Array} state = [] contains initial state
 * @param  {object} action actions from the document actions
 * @return {type} returns an array
 */
export default function documentReducer(
  state = initialState.manageDocuments, action) {
  switch (action.type) {
  case types.CREATE_DOCUMENT_SUCCESS:
    return [...state,
      Object.assign({},
      action.documents)
    ];
  case types.LOAD_DOCUMENTS_SUCCESS:
    return action.documents;
  default:
    return state;
  }
}
