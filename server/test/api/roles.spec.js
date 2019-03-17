import { agent } from 'supertest';
import expect from 'expect';
import app from '../../config/app';
import helper from '../helper/test-helper';

// process.env.NODE_ENV = 'test';


// This agent refers to PORT where program is runninng.

const server = agent(app);
const role = helper.newRole;
const adminUser = helper.administrator;
const regularUser = helper.regular;

describe('Roles API', () => {
  let userDetails;
  let regularDetails;
  let roleDetails;
  before((done) => {
    server
      .post('/users/login')
      .send(regularUser)
      .end((err, res) => {
        regularDetails = res.body;
        server
          .post('/users/login')
          .type('form')
          .send(adminUser)
          .end((err, res) => {
            userDetails = res.body;
            done();
          });
      });
  });

  describe('Create Role', () => {
    it('should create new role', (done) => {
      server
        .post('/roles')
        .set('x-access-token', userDetails.token)
        .send(role)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          roleDetails = res.body;
          expect(res.body.message).toEqual('Role created succesfully');
          expect(res.status).toEqual(200);
          if (err) return done(err);
          done();
        });
    });

    it('should not create role without admin access', (done) => {
      server
        .post('/roles')
        .set('x-access-token', regularDetails.token)
        .send(role)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(403);
          expect(res.body.message).toEqual(
            'Access denied, only Admins are allowed');
          if (err) return done(err);
          done();
        });
    });

    it('should not create new role, should return 400', (done) => {
      server
        .post('/roles')
        .set('x-access-token', userDetails.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.message).toEqual('Error creating new role');
          expect(res.status).toEqual(400);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/GET Role', () => {
    it('should return 200 for role endpoint', (done) => {
      server
        .get('/roles')
        .set('x-access-token', userDetails.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          if (err) return done(err);
          done();
        });
    });

    it('should return administrator for role id 1', (done) => {
      server
        .get('/roles/1')
        .set('x-access-token', userDetails.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.role.title).toEqual('admin');
          if (err) return done(err);
          done();
        });
    });

    it('should return Role not found', (done) => {
      server
        .get('/roles/10')
        .set('x-access-token', userDetails.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message)
          .toEqual('This role does not exist');
          if (err) return done(err);
          done();
        });
    });
    it('should return Error occured while retrieving role', (done) => {
      server
        .get('/roles/role')
        .set('x-access-token', userDetails.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual(
            'Error occured while retrieving role');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/PUT Role', () => {
    const fieldsToUpdate = {
      title: 'normal',
    };
    it('should update role data ', (done) => {
      server
        .put(`/roles/${roleDetails.role.id}`)
        .set('x-access-token', userDetails.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('Role updated successfully.');
          if (err) return done(err);
          done();
        });
    });

    it('should not prevent updating role data title to empty string', (done) => {
      const fieldsToUpdateRole = {
        title: '',
      };
      server
        .put(`/roles/${roleDetails.role.id}`)
        .set('x-access-token', userDetails.token)
        .send(fieldsToUpdateRole)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('Role updated successfully.');
          expect(res.body.role.title).toNotEqual(fieldsToUpdateRole.title);
          if (err) return done(err);
          done();
        });
    });

    it(
      'should deny access from users other than admin when updating a role',
      (done) => {
        server
          .put(`/roles/${roleDetails.role.id}`)
          .set('x-access-token', regularDetails.token)
          .send(fieldsToUpdate)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(403);
            expect(res.body.message).toEqual(
              'Access denied, only Admins are allowed');
            if (err) return done(err);
            done();
          });
      });

    it('should return 404 when updating a role that does not exist', (done) => {
      server
        .put('/roles/10')
        .set('x-access-token', userDetails.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('This role does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should return 400 when updating an invalid role', (done) => {
      server
        .put('/roles/role')
        .set('x-access-token', userDetails.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message)
          .toEqual('Error occured while retrieving role');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/DELETE Role', () => {
    it('should delete role data ', (done) => {
      server
          .delete(`/roles/${roleDetails.role.id}`)
          .set('x-access-token', userDetails.token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message)
            .toEqual('This role has been deleted successfully');
            if (err) return done(err);
            done();
          });
    });

    it('should not delete invalid role', (done) => {
      server
          .delete('/roles/10')
          .set('x-access-token', userDetails.token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(404);
            expect(res.body.message)
            .toEqual('This role does not exist');
            if (err) return done(err);
            done();
          });
    });

    it('should return 403 deleting a role without admin right', (done) => {
      server
          .delete('/roles/1')
          .set('x-access-token', regularDetails.token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(403);
            expect(res.body.message).toEqual(
              'Access denied, only Admins are allowed');
            if (err) return done(err);
            done();
          });
    });

    it('should return Error deleting role when deleting invalid role',
    (done) => {
      server
        .delete('/roles/role')
        .set('x-access-token', userDetails.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message)
          .toEqual('Error occured while retrieving role');
          if (err) return done(err);
          done();
        });
    });
  });
});
