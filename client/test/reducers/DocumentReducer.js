import expect from 'expect';

import initialState from '../../reducers/initialState';
import DocumentReducer from '../../reducers/DocumentReducer';

import types from '../../actions/actionTypes';

describe('Document Reducer', () => {
  it('should return empty array for all users with unknow type', () => {
    const action = {
      type: null,
    };
    expect(
      DocumentReducer(initialState.manageDocuments.allDocuments.length,
    action)).toEqual(0);
  });
  describe('LOAD_DOCUMENTS_SUCCESS', () => {
    const data = {
      document: {
        id: 1,
        title: 'my doc'
      },
      pagination: {}
    };
    const result = {
      allDocuments: {
        id: 1,
        title: 'my doc'
      },
      Pagination: {}
    };
    const action = {
      type: types.LOAD_DOCUMENTS_SUCCESS,
      data
    };
    it('should return a object that contains allDocuments', () => {
      expect(DocumentReducer(initialState.manageDocuments, action))
      .toIncludeKey('allDocuments');
    });
    it('should return a object that contains pagination', () => {
      expect(DocumentReducer(initialState.manageDocuments, action))
      .toIncludeKey('Pagination');
    });
    it('should return data when successful', () => {
      expect(DocumentReducer(initialState.manageDocuments, action))
      .toEqual(result);
    });
  });
});
