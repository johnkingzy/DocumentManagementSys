/* eslint func-name:off*/
import { agent } from 'supertest';
import expect from 'expect';

import app from '../../config/app';
import helper from '../helper/test-helper';

process.env.NODE_ENV = 'test';

// This agent refers to PORT where program is runninng.
const server = agent(app);
const adminUser = helper.adminUser;
const regUser = helper.regUser;

describe('User API', () => {
  let userData;
  let regUserData;

  before((done) => {
    server
      .post('/users')
      .send(regUser)
      .end((err, res) => {
        regUserData = res.body;
        done();
      });
  });

  describe('Create User', () => {
    it('should create new user', (done) => {
      server
        .post('/users')
        .send(adminUser)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.user.firstname)
            .toEqual(adminUser.firstname);
          expect(res.body.user.lastname)
            .toEqual(adminUser.lastname);
          expect(res.body.user.username)
            .toEqual(adminUser.username);
          expect(res.body.user.email)
            .toEqual(adminUser.email);
          expect(res.body.user.password)
            .toNotEqual(adminUser.password);
          expect(res.body).toIncludeKey('token');
          userData = res.body;
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('User was created Successfully');
          if (err) return done(err);
          done();
        });
    });

    it('should not create user with the same email', (done) => {
      server
        .post('/users')
        .send(adminUser)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(409);
          expect(res.body.message).toEqual('Username already exist');
          if (err) return done(err);
          done();
        });
    });

    it('rejects request if firstname field does not contain letters',
      (done) => {
        server.post('/users')
          .send({
            firstname: '122334',
            lastname: 'mayor',
            password: 'password123',
            username: 'mrincredible',
            email: 'me@you.com'
          })
          .expect(409)
          .end((err, res) => {
            expect(res.body.message)
            .toEqual('firstname should contain chararcters only');
            done(err);
          });
      });
    it('rejects request if lastname field does not contain letters',
        (done) => {
          server.post('/users')
            .send({
              lastname: '12234554',
              firstname: 'mayor',
              password: 'password123',
              username: 'mrincredible',
              email: 'me@you.com'
            })
            .expect(409)
            .end((err, res) => {
              expect(res.body.message)
              .toEqual('lastname should contain chararcters only');
              done(err);
            });
        });
    it('rejects request if email address is not valid',
          (done) => {
            server.post('/users')
              .send({
                email: '1272823376487',
                lastname: 'mayor',
                password: 'password123',
                username: 'mrincredible'
              })
              .expect(409)
              .end((err, res) => {
                expect(res.body.message)
                .toEqual('Provide a valid a Email Adrress');
                done(err);
              });
          });
    it('rejects request if password length is less than 8',
      (done) => {
        server.post('/users')
          .send({
            password: 'pass',
            lastname: 'mayor',
            firstname: 'joy',
            username: 'mrincredible',
            email: 'me@you.com'
          })
          .expect(409)
          .end((err, res) => {
            expect(res.body.message)
            .toEqual('Provide a valid password with minimum of 8 characters');
            done(err);
          });
      });

    it('should not create new user with empty email', (done) => {
      server
        .post('/users')
        .send(
        { firstname: 'jonathan',
          lastname: 'mayor',
          password: 'password123',
          username: 'mrincredible'
        })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(409);
          expect(res.body.message)
          .toEqual('Your Email Address is required');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/GET User', () => {
    it('should 401 for unautorized user without token', (done) => {
      server
        .get('/users')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.message)
          .toEqual('Access denied, Authentication token does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should return user when limit and offset are set', (done) => {
      server
        .get('/users/?limit=10&offset=1')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          if (err) return done(err);
          done();
        });
    });

    it('should return user when limit and offset are not set', (done) => {
      server
        .get('/users/')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          if (err) return done(err);
          done();
        });
    });

    it('should return user with specified id', (done) => {
      server
        .get(`/users/${userData.user.id}`)
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.user.email).toEqual(userData.user.email);
          if (err) return done(err);
          done();
        });
    });

    it('should not return user with invalid id', (done) => {
      server
        .get('/users/maximuf')
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          if (err) return done(err);
          done();
        });
    });

    it('should return user with specified username or email', (done) => {
      server
        .get(`/users/verify/${userData.user.email}`)
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.user.email).toEqual(userData.user.email);
          if (err) return done(err);
          done();
        });
    });

    it('should return 404 with specified username or email', (done) => {
      server
        .get('/users/verify/Casandra')
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('User does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should return User does not exist for invalid user Id', (done) => {
      server
        .get('/users/99910')
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('User does not exist');
          if (err) return done(err);
          done();
        });
    });
    it(`should return users own profile,
        when the requester is a regular user`, (done) => {
      server
          .get('/users')
            .set({ 'x-access-token': regUserData.token })
            .end((err, res) => {
              expect(res.status).toEqual(200);
              expect(res.body.message)
              .toEqual('You have successfully retrieved all users');
              expect(res.body.users.rows[0].username)
              .toEqual(regUserData.user.username);
              done();
            });
    });
    it(`should return all users profile,
       when the requester is an admin user`, (done) => {
      server
         .get('/users')
           .set({ 'x-access-token': userData.token })
           .end((err, res) => {
             expect(res.status).toEqual(200);
             expect(res.body.message)
             .toEqual('You have successfully retrieved all users');
             done();
           });
    });
  });
  describe('/PUT update user', () => {
    const fieldsToUpdate = {
      firstname: 'Kingsley',
    };
    it('should update user data', (done) => {
      server
        .put(`/users/${userData.user.id}`)
        .set('x-access-token', userData.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('Profile Info Updated Successfully');
          if (err) return done(err);
          done();
        });
    });

    it('should not update user data with invalid user id ', (done) => {
      server
        .put('/users/maximufjk')
        .set('x-access-token', userData.token)
        .send({ roleId: 100 })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message)
          .toEqual('An Error occured, please contact admin');
          if (err) return done(err);
          done();
        });
    });

    it('should not update user data with invalid id', (done) => {
      server
        .put('/users/100')
        .set('x-access-token', userData.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('User does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should not allow user to set roleId', (done) => {
      server
        .put(`/users/${userData.user.id}`)
        .set('x-access-token', userData.token)
        .send({ roleId: 10 })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(403);
          expect(res.body.message)
          .toEqual('An Error Ocurred');
          if (err) return done(err);
          done();
        });
    });

    it('should return 403 updating another user without admin right ',
    (done) => {
      server
        .put(`/users/${userData.user.id}`)
        .set('x-access-token', regUserData.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(403);
          expect(res.body.message).toEqual('Unauthorized Access');
          if (err) return done(err);
          done();
        });
    });
  });
  describe('/DELETE user data', () => {
    it('should not allow admin to delete his/her account', (done) => {
      server
        .delete(`/users/${userData.user.id}`)
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(403);
          if (err) return done(err);
          done();
        });
    });

    it('should return user not found with invalid id', (done) => {
      server
        .delete('/users/100')
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message)
          .toEqual('The user you trying to delete does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should return 403 when regular user tries to delete an account',
    (done) => {
      server
        .delete('/users/1')
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(403);
          expect(res.body.message)
          .toEqual('Access denied, only Admins are allowed');
          if (err) return done(err);
          done();
        });
    });

    it('should not delete user data with invalid user id ', (done) => {
      server
        .delete('/users/maximuf')
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message)
          .toEqual('An Error Occured while deleting user');
          if (err) return done(err);
          done();
        });
    });
    it('should return delete a user from the database', (done) => {
      server
        .delete(`/users/${regUserData.user.id}`)
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message)
          .toEqual('User was deleted successfully');
          if (err) return done(err);
          done();
        });
    });
  });
  describe('Existing users', () => {
    describe('Login /users/login', () => {
      it('should allow admin user to login', (done) => {
        server
        .post('/users/login')
          .send(adminUser)
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(res.body.token).toNotEqual(null);
            expect(res.body.message)
            .toEqual('Logged In Successfully');
            done();
          });
      });

      it('should not allow unregistered users to login', (done) => {
        server.post('/users/login')
          .send(helper.anotherUser)
          .end((err, res) => {
            expect(res.status).toEqual(401);
            expect(res.body.message)
            .toEqual('Invalid Credentials.');
            done();
          });
      });

      it('should not allow login with invalid password', (done) => {
        server.post('/users/login')
          .send({ username: adminUser.username, password: 'invalid' })
          .end((err, res) => {
            expect(res.status).toEqual(401);
            expect(res.body.message)
            .toEqual('Invalid Credentials.');
            done();
          });
      });

      it('should not allow login when username or password is not provided',
      (done) => {
        server.post('/users/login')
          .send({ })
          .end((err, res) => {
            expect(res.status).toEqual(400);
            expect(res.body.message)
            .toEqual('Please provide your username or password to login');
            done();
          });
      });
    });
  });
  describe('SEARCH USERS PAGINATION', () => {
    it('should return search result', (done) => {
      server.get('/users/search?query=solo')
         .set({ 'x-access-token': userData.token })
         .end((err, res) => {
           expect(res.body.message).toEqual('Your search was successful');
           done();
         });
    });

    it('should return search result with pagination', (done) => {
      server.get('/users/search?query=maximuf david')
       .set({ 'x-access-token': userData.token })
       .end((err, res) => {
         expect(res.body.message)
         .toEqual('Your search was successful');
         expect(res.body.pagination).toIncludeKey('page_count');
         expect(res.body.pagination).toIncludeKey('page');
         expect(res.body.pagination).toIncludeKey('page_size');
         expect(res.body.pagination).toIncludeKey('total_count');
         done();
       });
    });
  });

  describe('Logout', () => {
    it('should logout successfully', (done) => {
      server
      .post('/users/logout')
     .set({ 'x-access-token': userData.token })
       .end((err, res) => {
         expect(res.status)
         .toEqual(200);
         expect(res.body.message)
         .toEqual('You have successfully logged out');
         done();
       });
    });
  });
});
