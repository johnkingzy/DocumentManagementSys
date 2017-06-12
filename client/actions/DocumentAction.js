import axios from 'axios';
import omit from 'lodash/omit';

import types from './actionTypes';

/**
//  * createDocument - create documents action
 * @param  {object} data document data
 * @return {object} return an object
 */
export function loadDocumentSuccess(data) {
  return {
    type: types.LOAD_DOCUMENTS_SUCCESS,
    data
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
 * @param {Number} offset value for pagination
 * @return {Function} returns a dispatch
 */
export function loadDocuments(offset) {
  const pageOffset = offset || 0;
  return dispatch =>
  axios.get(`/documents?offset=${pageOffset}`)
    .then((response) => {
      const { document, pagination } = response.data;
      const data = {
        document: document.rows,
        pagination
      };
      dispatch(loadDocumentSuccess(data));
    })
    .catch(error =>
      dispatch(errorMessage(error.response.data.message))
    );
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
    .catch(error =>
      dispatch(errorMessage(error.response.data.message))
    );
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
    .catch(error =>
      dispatch(errorMessage(error.response.data.message))
    );
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
    .catch(error =>
    dispatch(errorMessage(error.response.data.message))
    );
  };
}
