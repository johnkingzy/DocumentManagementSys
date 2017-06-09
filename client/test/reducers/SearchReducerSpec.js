import expect from 'expect';

import initialState from '../../reducers/initialState';
import SearchReducer from '../../reducers/SearchReducer';

import types from '../../actions/actionTypes';

describe('Search Reducer', () => {
  it('should return empty array for all users with unknow type', () => {
    const action = {
      type: null,
    };
    expect(
      SearchReducer(initialState.manageSearch.searchedDocuments.length,
    action)).toEqual(0);
  });
  describe('SEARCH_DOCUMENTS_SUCCESS', () => {
    const result = {
      documents: {
        rows: [{
          id: 1,
          title: 'my doc'
        }]
      },
      pagination: {}
    };
    const expectedResult = {
      searchedDocuments: [
        {
          id: 1,
          title: 'my doc'
        }
      ],
      searchedPageCount: {},
      searchedUsers: []
    };
    const action = {
      type: types.SEARCH_DOCUMENTS_SUCCESS,
      result
    };
    it('should return a object that contains searchResult', () => {
      expect(SearchReducer(initialState.manageSearch, action))
      .toIncludeKey('searchedDocuments');
    });
    it('should return a object that contains pagination', () => {
      expect(SearchReducer(initialState.manageSearch, action))
      .toIncludeKey('searchedPageCount');
    });
    it('should return result when successful', () => {
      expect(SearchReducer(initialState.manageSearch, action))
      .toEqual(expectedResult);
    });
  });
});
