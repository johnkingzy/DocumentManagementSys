/* eslint no-unused-expressions: 0 */
/* eslint no-underscore-dangle: "off"*/
import httpMocks from 'node-mocks-http';
import events from 'events';
import chai from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import app from '../../config/app';
import helper from '../helper/test-helper';
// import db from '../../app/models';
import Auth from '../../config/middlewares/Authentication';

const expect = chai.expect;
const superRequest = supertest(app);
let adminToken, regularUser, regularToken;
let request;
const responseEvent = () => httpMocks
  .createResponse({ eventEmitter: events.EventEmitter });

describe('MIDDLEWARE TEST', () => {
  before((done) => {
    superRequest.post('/users/login')
      .send(helper.adminUser)
      .end((err, res) => {
        adminToken = res.body.token;
        superRequest.post('/users')
          .send(helper.regUser)
          .end((err, res) => {
            regularToken = res.body.token;
            regularUser = res.body.user;
            done();
          });
      });
  });

  describe('Authenticate User', () => {
    it('should authenticate the user if token is valid', (done) => {
      const response = httpMocks.createResponse();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { 'x-access-token': adminToken }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.isLoggedIn(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });

    it('should not continue if token is invalid', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { 'x-access-token': 'hhehagagagg' }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.isLoggedIn(request, response, middlewareStub.callback);
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('Failed to Authenticate Token');
        done();
      });
    });
  });
  describe('Admin', () => {
    it('should not continue when requester is not an admin user', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/roles',
        headers: { 'x-access-token': regularToken },
        decoded: {
          user: {
            roleId: helper.adminUser.roleId
          }
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.checkAdmin(request, response, middlewareStub.callback);
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('You are not permitted to perform this action');
      });
      done();
    });

    it('should continue for admin user', (done) => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/roles',
        headers: { 'x-access-token': adminToken },
        decoded: { user: {
          roleId: helper.adminUser.roleId
        }
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.checkAdmin(request, response, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });
  });
  describe('Validate delete', () => {
    it('should return an error when userId is not a number', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/users/hello',
        decoded: {
          user: {
            id: 1
          }
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('An Error Occured while deleting user');
      });
      Auth.validateDelete(request, response, middlewareStub.callback);
    });
    it('should prevent other admins from deleting default admin', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/users/1',
        decoded: {
          user: {
            id: 3,
            roleId: 1
          }
        },
        params: {
          id: '1'
        },
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('You are not allowed to delete the default Admin');
      });
      Auth.validateDelete(request, response, middlewareStub.callback);
    });

    it('should prevent other users from deleting other users account', () => {
      const response = responseEvent();
      request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/users/3',
        decoded: {
          user: {
            id: 6,
            roleId: 2
          }
        },
        params: {
          id: 3
        },
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      response.on('end', () => {
        expect(response._getData().message).to
          .equal('Unauthorized Access');
      });
      Auth.validateDelete(request, response, middlewareStub.callback);
    });
  });
});
