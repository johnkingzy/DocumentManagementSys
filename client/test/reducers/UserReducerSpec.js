import expect from 'expect';

import initialState from '../../reducers/initialState';
import UserReducer from '../../reducers/UserReducer';

import types from '../../actions/actionTypes';

describe('User Reducer', () => {
  it('should return empty array for all users with unknow type', () => {
    const action = {
      type: null,
    };
    expect(
      UserReducer(initialState.manageUsers.allUsers.length,
    action)).toEqual(0);
  });
  describe('LOAD_USERS_SUCCESS', () => {
    const action = {
      type: types.LOAD_USERS_SUCCESS,
      data: {
        users: {
          rows: []
        },
        pagination: {}
      }
    };
    it('should return a object that contains allUsers', () => {
      expect(UserReducer(initialState.manageUsers, action))
      .toIncludeKey('allUsers');
    });
    it('should return a object that contains pageCount', () => {
      expect(UserReducer(initialState.manageUsers, action))
      .toIncludeKey('pageCount');
    });
  });
  describe('FETCH_USERS_SUCCESS', () => {
    const action = {
      type: types.FETCH_USERS_SUCCESS,
      data: {}
    };
    it('should return a object that contains authUser', () => {
      expect(UserReducer(initialState.manageUsers, action))
      .toIncludeKey('authUser');
    });
  });
});
