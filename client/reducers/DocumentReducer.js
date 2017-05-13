import types from '../actions/actionTypes';

/**
 * document - document reducer
 * @param  {Array} state = [] contains initial state
 * @param  {object} action actions from the document actions
 * @return {type} returns an array
 */
export default function documentReducer(state = [], action) {
  switch (action.type) {
  case types.CREATE_DOCUMENT_SUCCESS:
    return [...state,
      Object.assign({}, action.document)
    ];
  case types.LOAD_DOCUMENTS_SUCCESS:
    return action.documents;
  default:
    return state;
  }
}
