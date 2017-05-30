import { agent } from 'supertest';
import expect from 'expect';
import app from '../../config/app';

process.env.NODE_ENV = 'test';

// This agent refers to PORT where program is runninng.
const server = agent(app);


describe('Search API', () => {
  let adminDetails;
  let regularDetails;

  before((done) => {
    server
      .post('/users/login')
      .type('form')
      .send({
        username: 'maximuf',
        password: 'password123'
      })
      .end((err, res) => {
        adminDetails = res.body;
        server
          .post('/users/login')
          .type('form')
          .send({
            username: 'pythagoras',
            password: 'pythagoras'
          })
          .end((err, res) => {
            regularDetails = res.body;
            done();
          });
      });
  });

  describe('User Search', () => {
    it('Should return a list of users based on search criteria', (done) => {
      server
        .get('/users/search?query=maximuf')
        .set({
          'x-access-token': adminDetails.token
        })
        .end((err, res) => {
          const result = res.body.users.rows[0];
          expect(result.username).toEqual('maximuf');
          done();
        });
    });

    it('Should return 1 as the length of the result', (done) => {
      server
        .get('/users/search?query=max')
        .set({
          'x-access-token': adminDetails.token
        })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.users.rows.length).toEqual(1);
          done();
        });
    });

    it('Should return error for non-admin search', (done) => {
      server
        .get('/users/search?query=xx')
        .set({ 'x-access-token': regularDetails.token })
        .end((err, res) => {
          expect(res.body.message)
          .toEqual('Access denied, only Admins are allowed');
          done();
        });
    });

    it('Should return User not Found', (done) => {
      server
        .get('/users/search?query=qwert')
        .set({
          'x-access-token': adminDetails.token
        })
        .end((err, res) => {
          expect(res.body).toIncludeKey('pagination');
          if (res.body.message) {
            expect(res.body.message).toEqual('User not Found');
          }
          done();
        });
    });
    it('Should return User not Found', (done) => {
      server
        .get('/users/search?query=maximuf')
        .set({
          'x-access-token': adminDetails.token
        })
        .end((err, res) => {
          expect(res.body).toIncludeKey('pagination');
          if (res.body.message) {
            expect(res.body.message).toEqual('Your search was successful');
          }
          done();
        });
    });
  });

  describe('Document Search', () => {
    it('Should return Document not Found', (done) => {
      server
        .get('/documents/search?query=document')
        .set({
          'x-access-token': adminDetails.token
        })
        .end((err, res) => {
          expect(res.body).toIncludeKey('pagination');
          if (res.body.message) {
            expect(res.body.message).toEqual('Your search was successful');
          }
          done();
        });
    });

    it('Should return Document not Found', (done) => {
      server
        .get('/documents/search?query=qwerty')
        .set({
          'x-access-token': adminDetails.token
        })
        .end((err, res) => {
          expect(res.body).toIncludeKey('pagination');
          if (res.body.message) {
            expect(res.body.message).toEqual('Document not Found');
          }
          done();
        });
    });
  });
});
