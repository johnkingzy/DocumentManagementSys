import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as SearchActions from '../../actions/SearchActions';
import types from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
// Test a sync action
describe('Search Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  describe('searchDocumentsSuccess', () => {
    it('should create a new searchDocumentsSuccess action', (done) => {
      // arrange
      const result = {
        documents: {
          rows: []
        },
        pagination: {
          page_count: 0,
          page: 1,
          page_size: 0,
          total_count: 0
        }
      };
      const expectedAction = {
        type: types.SEARCH_DOCUMENTS_SUCCESS,
        result
      };
      // act
      const action = SearchActions.searchDocumentsSuccess(result);
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });

  describe('SearchUsers', () => {
    it('searches for users and dispatches SEARCH_USERS_SUCCESS', () => {
      moxios.stubRequest('/users/search?query=m&limit=9&offset=0', {
        status: 200,
        response: {
          users: {
            rows: [
              {}
            ]
          },
          pagination: {}
        }
      });
      const result = {
        users: {
          rows: [
            [{}]
          ]
        },
        pagination: {}
      };
      const expectedActions = {
        type: 'SEARCH_USERS_SUCCESS',
        result
      };
      const store = mockStore();

      store.dispatch(SearchActions.searchUsers('m'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('searches for users and dispatches SEARCH_USERS_SUCCESS', () => {
      const result = {
        users: {
          rows: [
            [{}]
          ]
        },
        pagination: {}
      };
      const expectedActions = {
        type: types.SEARCH_USERS_SUCCESS,
        result
      };
      const action = SearchActions.searchUsersSuccess(result);
      expect(action).toEqual(expectedActions);
    });
  });

  describe('SearchDocuments', () => {
    it('searches for documents and dispatches SEARCH_DOCUMENTS_SUCCESS', () => {
      moxios.stubRequest('documents/search?query=m&limit=9&offset=0', {
        status: 200,
        response: {
          documents: {
            rows: []
          },
          pagination: {}
        }
      });
      const result = {
        documents: {
          rows: []
        },
        pagination: {}
      };
      const expectedAction = {
        type: types.SEARCH_DOCUMENTS_SUCCESS,
        result
      };
      const store = mockStore();

      store.dispatch(SearchActions.searchDocuments('m'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
    it('searches for users and dispatches SEARCH_USERS_SUCCESS', () => {
      const result = {
        users: {
          rows: [
            [{}]
          ]
        },
        pagination: {}
      };
      const expectedActions = {
        type: types.SEARCH_USERS_SUCCESS,
        result
      };
      const action = SearchActions.searchUsersSuccess(result);
      expect(action).toEqual(expectedActions);
    });
  });
});
