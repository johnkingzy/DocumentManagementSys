import expect from 'expect';
import * as RolesActions from '../../actions/RolesAction';
import types from '../../actions/actionTypes';

// Test a sync action
describe('Roles Actions', () => {
  describe('loadRolesSuccess', () => {
    it('should create a LOAD_ROLES_SUCCESS action', (done) => {
      // arrange
      const data = {
        title: 'admin'
      };
      const expectedAction = {
        type: types.LOAD_ROLES_SUCCESS,
        data
      };
      // act
      const action = RolesActions.loadRoleSuccess(data);
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });
});
