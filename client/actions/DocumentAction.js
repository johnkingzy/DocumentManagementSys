import axios from 'axios';
import jwtDecode from 'jwt-decode';
import types from './actionTypes';

/**
//  * createDocument - create documents action
 * @param  {object} documents document data
 * @return {object} return an object
 */
export function loadDocumentSuccess(documents) {
  return {
    type: types.LOAD_DOCUMENTS_SUCCESS,
    documents
  };
}

export function viewDocumentSuccess(currentDocument) {
  return {
    type: types.VIEW_DOCUMENT_SUCCESS,
    currentDocument
  };
}

export function createDocumentSuccess(documents) {
  return {
    type: types.CREATE_DOCUMENT_SUCCESS,
    documents
  };
}

export function updateDocumentSuccess(document) {
  return {
    type: types.UPDATE_DOCUMENT_SUCCESS,
    document
  };
}

export function createDocument(data) {
  return dispatch => axios.post('/documents', data)
    .then((response) => {
      const result = response.data;
      dispatch(createDocumentSuccess(result));
    })
    .catch((error) => {
      throw (error);
    });
}

/**
 * loadDocument - fetches documents from database
 * @return {Function} returns a dispatch
 */
export function loadDocuments() {
  const token = localStorage.getItem('jwtToken');
  const details = jwtDecode(token);
  const userId = details.user.id;
  return dispatch => axios.get(`/documents/users/${userId}/alldocuments`)
    .then((response) => {
      const documents = response.data;
      dispatch(loadDocumentSuccess(documents));
    })
    .catch((error) => {
      throw (error);
    });
}

export function updateDocument(data) {
  return (dispatch) => {
    return axios.put(`/documents/${data.id}`, data)
    .then(() => {
      dispatch(loadDocuments());
    })
    .catch((error) => {
      throw (error);
    });
  };
}

export function deleteDocument(documentId) {
  return (dispatch) => {
    return axios.delete(`/documents/${documentId}`)
    .then(() => {
      dispatch(loadDocuments());
    })
    .catch((error) => {
      throw (error);
    });
  };
}
