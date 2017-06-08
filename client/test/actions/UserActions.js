import expect from 'expect';
import * as UserActions from '../../actions/UserAction';
import * as AuthActions from '../../actions/AuthAction';
import types from '../../actions/actionTypes';

// Test a sync action
describe('User Actions', () => {
  describe('createUserSuccess', () => {
    it('should create a CREATE_USER_SUCCESS action', (done) => {
      // arrange
      const user = {
        name: 'test actions',
        username: 'testreduce',
        email: 'testreduce@gmail.com',
        password: 'password',
        roleId: 2
      };
      const expectedAction = {
        type: types.CREATE_USER_SUCCESS,
        user
      };
      // act
      const action = AuthActions.createUserSuccess(user);
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });

  describe('loadUserSuccess', () => {
    it('should load user, LOAD_USER_SUCCESS action', (done) => {
      // arrange
      const data = {
        name: 'test actions',
        username: 'testreduce',
        email: 'testreduce@gmail.com',
        password: 'password',
        roleId: 2
      };
      const expectedAction = {
        type: types.LOAD_USERS_SUCCESS,
        data
      };
      const action = UserActions.loadUserSuccess(data);
      expect(action).toEqual(expectedAction);
      done();
    });
  });

  describe('setCurrentUser', () => {
    it('should set current logged in user, SET_CURRENT_USER action', (done) => {
      // arrange
      const user = {
        id: 1,
        name: 'test actions',
        username: 'testreduce',
        email: 'testreduce@gmail.com',
        password: 'password',
        roleId: 2
      };

      const expectedAction = {
        type: types.SET_CURRENT_USER,
        user
      };
      // act
      const action = AuthActions.setCurrentUser(user);
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });
  describe('fetchUserSuccess', () => {
    it('should set current logged in user, SET_CURRENT_USER action', (done) => {
      const data = {
        id: 1,
        name: 'test actions',
        username: 'testreduce',
        email: 'testreduce@gmail.com',
        password: 'password',
        roleId: 2
      };

      const expectedAction = {
        type: types.FETCH_USERS_SUCCESS,
        data
      };
      // act
      const action = UserActions.fetchUserSuccess(data);
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });
});
