/* eslint no-unused-expressions: 0 */
/* eslint no-underscore-dangle: "off"*/
import httpMocks from 'node-mocks-http';
import events from 'events';
import chai from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import app from '../../config/app';
import helper from '../helper/test-helper';
import db from '../../app/models';
import Auth from '../../config/middlewares/Authentication';

const expect = chai.expect;
const superRequest = supertest(app);

let request;
const responseEvent = () => httpMocks
  .createResponse({ eventEmitter: events.EventEmitter });

let adminToken;

describe('MIDDLEWARE TEST', () => {
  before((done) => {
    superRequest.post('/users/login')
      .send(helper.adminUser)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
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
});
