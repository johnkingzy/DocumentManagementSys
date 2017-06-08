import expect from 'expect';
import axios from 'axios';
import * as DocumentActions from '../../actions/DocumentAction';
import * as types from '../../actions/actionTypes';

// Test a sync action
describe('Document Actions', () => {
  describe('loadDocumentSuccess', () => {
    it('should create a LOAD_DOCUMENTS_SUCCESS action', (done) => {
      // arrange
      const document = {
        rows: [{
          title: 'hello world',
          content: 'where are you now',
          access: 'public',
          ownerId: 2,
          ownerRoleID: 2
        }]
      };
      const pagination = {};
      const data = {
        document: document.rows,
        pagination
      };
      const expectedAction = {
        type: types.LOAD_DOCUMENTS_SUCCESS,
        data
      };
      // act
      const action = DocumentActions.loadDocumentSuccess(data);
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });
  // describe('loadDocuments', () => {
  //   it('should load documents from server', () => {
  //     const
  //   });
  // });
});
