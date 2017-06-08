import { agent } from 'supertest';
import expect from 'expect';

import app from '../../config/app';
import helper from '../helper/test-helper';

process.env.NODE_ENV = 'test';

// This agent refers to PORT where program is runninng.
const server = agent(app);
const newDocument = helper.publicDocument;
const regUser = helper.docUser;
const adminDocUser = helper.adminDocUser;

describe('Document API', () => {
  let documentDetails;
  let regUserData;
  let adminUser;

  before((done) => {
    server
      .post('/users')
      .send(regUser)
      .end((err, res) => {
        regUserData = res.body;
        newDocument.userId = regUserData.user.id;
        newDocument.role = String(regUserData.user.roleId);
        server
          .post('/users')
          .send(adminDocUser)
          .end((err, res) => {
            adminUser = res.body;
          });

        done();
      });
  });


  describe('Create Document', () => {
    it('should create new document', (done) => {
      server
        .post('/documents')
        .set('x-access-token', regUserData.token)
        .send(newDocument)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          documentDetails = res.body;
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual(
            'Your document was created successfully');
          if (err) return done(err);
          done();
        });
    });

    it('should 400 for invalid document data', (done) => {
      server
        .post('/documents')
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(403);
          expect(res.body.message).toEqual(
            'Please type in a title for the document');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/GET Documents', () => {
    it('should 401 for unauthorized user without token', (done) => {
      server
        .get('/documents/?limit=10&offset=1')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          if (err) return done(err);
          done();
        });
    });

    it('should 200 without limit and offset', (done) => {
      server
        .get('/documents/')
        .set('x-access-token', adminUser.token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          if (err) return done(err);
          done();
        });
    });

    it('should return document with specified id', (done) => {
      server
        .get(`/documents/${documentDetails.document.id}`)
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.document.title)
          .toEqual(documentDetails.document.title);
          if (err) return done(err);
          done();
        });
    });

    it('should return Document Not found for invalid document Id', (done) => {
      server
        .get('/documents/99910')
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('Document Not found');
          if (err) return done(err);
          done();
        });
    });

    it('should return documents the specified user', (done) => {
      server
        .get(`/users/${regUserData.user.id}/documents`)
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          if (err) return done(err);
          done();
        });
    });

    it('should return users documents with public and same role ', (done) => {
      server
        .get(`/users/${regUserData.user.id}/documents`)
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status)
          .toEqual(200);
          if (err) return done(err);
          done();
        });
    });

    it('should return user not found', (done) => {
      server
        .get('/users/100/documents')
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('User Not Found');
          if (err) return done(err);
          done();
        });
    });

    it('should return Error occurred while retrieving user document',
    (done) => {
      server
        .get('/users/maximuf/documents')
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual(
            'Error occurred while retrieving user document');
          if (err) return done(err);
          done();
        });
    });

    it('should return 400 code status for invalid document Id', (done) => {
      server
        .get('/documents/maximuf')
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual(
            'Error occurred while retrieving documents');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/PUT update document', () => {
    const fieldsToUpdate = {
      title: 'Newly Updated Document',
    };

    it('should update document data ', (done) => {
      server
        .put(`/documents/${documentDetails.document.id}`)
        .set('x-access-token', regUserData.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('Document updated successfully');
          if (err) {
            done(err);
          }
          done();
        });
    });

    it('should return Document Not found for invalid Id', (done) => {
      server
        .put('/documents/100')
        .set('x-access-token', adminUser.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Document not found');
          if (err) {
            done(err);
          }
          done();
        });
    });

    it('should return Document Not Found for invalid Id', (done) => {
      server
        .put('/documents/maximuf')
        .set('x-access-token', adminUser.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message)
          .toEqual('Error occured while retrieving role');
          if (err) {
            done(err);
          }
          done();
        });
    });

    it('should return Error when updating document id', (done) => {
      server
        .put(`/documents/${documentDetails.document.id}`)
        .set('x-access-token', regUserData.token)
        .send({ id: 10 })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(403);
          if (err) {
            done(err);
          }
          done();
        });
    });
  });

  describe('/DELETE document data', () => {
    it('should delete document data ', (done) => {
      server
        .delete(`/documents/${documentDetails.document.id}`)
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message)
          .toEqual('Document was deleted successfully');
          if (err) return done(err);
          done();
        });
    });

    it('should return document not found ', (done) => {
      server
        .delete('/documents/100')
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Document not found');
          if (err) return done(err);
          done();
        });
    });

    it('should return document not found ', (done) => {
      server
        .delete('/documents/maximuf')
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message)
          .toEqual('Error occured while deleting document');
          if (err) return done(err);
          done();
        });
    });
  });
});
