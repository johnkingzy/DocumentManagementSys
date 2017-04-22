import supertest from 'supertest';
import * as chai from 'chai';
import app from '../../server';

const expect = chai.expect;
const server = supertest.agent(app);


describe('Users CRUD Test', () => {
  it('should allow a users to be posted and return ', (done) => {
    server
    .get('/')
    .expect('Content-type', /json/)
    .expect(200)
    .end((error, response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      done();
    });
  });
});
