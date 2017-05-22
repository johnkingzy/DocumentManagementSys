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
    .catch((error) => {
      throw (error);
    });
}

/**
 * updateDocument - description
 * @param  {type} data contains the document data
 * @return {Function} returns a dispatch
 */
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
    .catch((error) => {
      throw (error);
    });
  };
}
