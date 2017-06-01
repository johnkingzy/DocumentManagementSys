import axios from 'axios';
import omit from 'lodash/omit';
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
/**
//  * errorMessage - create documents action
 * @param  {object} message message to be displayed
 * @return {object} return an object
 */
export function errorMessage(message) {
  return Materialize.toast(message, 1000, 'red');
}
/**
 * loadDocument - fetches documents from database
 * @return {Function} returns a dispatch
 */
export function loadDocuments() {
  const token = localStorage.getItem('jwtToken');
  const details = jwtDecode(token);
  const userId = details.user.id;
  return dispatch => axios.get(`/users/${userId}/documents`)
    .then((response) => {
      const documents = response.data;
      dispatch(loadDocumentSuccess(documents.document));
    })
    .catch(() => {
      dispatch(errorMessage('An error occured while retrieving documents'));
    });
}

/**
 * createDocument - creates a new document
 * @param  {object} data contains the document data
 * @return {Function} returns a dispatch
 */
export function createDocument(data) {
  return dispatch => axios.post('/documents', data)
    .then(() => {
      dispatch(loadDocuments());
    })
    .catch(() => {
      dispatch(errorMessage('An error occured please try again'));
    });
}

/**
 * updateDocument - description
 * @param  {type} data contains the document data
 * @return {Function} returns a dispatch
 */
export function updateDocument(data) {
  const updatedData = omit(data, [
    'id'
  ]);
  return (dispatch) => {
    return axios.put(`/documents/${data.id}`, updatedData)
    .then(() => {
      dispatch(loadDocuments());
    })
    .catch(() => {
      dispatch(errorMessage('An error retrieving documents'));
    });
  };
}

/**
 * deleteDocument - deletes a document
 * @param  {number} documentId the document id
 * @return {Function} returns a dispatch
 */
export function deleteDocument(documentId) {
  return (dispatch) => {
    return axios.delete(`/documents/${documentId}`)
    .then(() => {
      dispatch(loadDocuments());
    })
    .catch(() => {
      dispatch(errorMessage('An error occured please try again'));
    });
  };
}
