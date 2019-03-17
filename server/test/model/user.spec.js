import expect from 'expect';
import db from '../../app/models';
import helper from '../helper/test-helper';

describe('User Model', () => {
  const requiredFields = [
    'username',
    'firstname',
    'lastname',
    'email',
    'password'
  ];
  const uniqueFields = ['username', 'email'];
  const emptyFields = ['firstname', 'lastname'];
  const defaultRoleId = 2;
  let regularUser;

  describe('Create user', () => {
    it('should create a new user', (done) => {
      db.User.create(helper.regularUser)
        .then((user) => {
          regularUser = user.dataValues;
          expect(user.dataValues.firstname)
            .toEqual(helper.regularUser.firstname);
          expect(user.dataValues.lastname)
            .toEqual(helper.regularUser.lastname);
          expect(user.dataValues.username)
            .toEqual(helper.regularUser.username);
          expect(user.dataValues.email).toEqual(helper.regularUser.email);
          expect(user.dataValues.roleId).toEqual(defaultRoleId);
          done();
        });
    });

    it('should not create a user when email address is invalid', (done) => {
      db.User.create(helper.invalidEmailUser)
        .then()
        .catch((error) => {
          expect(error.errors[0].message)
            .toEqual('Input a valid email address');
          expect(error.errors[0].type).toEqual('Validation error');
          expect(error.errors[0].path).toEqual('email');
          done();
        });
    });

    it('should not create a user when password character is not up to 8',
    (done) => {
      db.User.create(helper.invalidPasswordUser)
        .then()
        .catch((error) => {
          expect(error.errors[0].message)
            .toEqual('Minimum of 8 characters is required');
          expect(error.errors[0].type).toEqual('Validation error');
          expect(error.errors[0].path).toEqual('validatePassword');
          done();
        });
    });
  });

  describe('Unique', () => {
    uniqueFields.forEach((field) => {
      const uniqueTest = Object.assign({}, helper.firstUser);
      uniqueTest[field] = helper.regularUser[field];
      it(`should fail for existing ${field}`, (done) => {
        db.User.create(uniqueTest)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).toEqual(`${field} already exist`);
          expect(error.errors[0].type).toEqual('unique violation');
          expect(error.errors[0].path).toEqual(field);
          done();
        });
      });
    });
  });

  describe('NOT NULL VIOLATIONS', () => {
    requiredFields.forEach((field) => {
      it(`should fail when ${field} is null`, (done) => {
        const nullField = Object.assign({}, helper.secondUser);
        nullField[field] = null;
        db.User.create(nullField)
          .then()
          .catch((error) => {
            expect(error.errors[0].message).toEqual(`${field} cannot be null`);
            expect(error.errors[0].type).toEqual('notNull Violation');
            done();
          });
      });
    });
  });

  describe('Empty string Violations', () => {
    emptyFields.forEach((field) => {
      it(`should fail when ${field} is empty`, (done) => {
        const emptyField = Object.assign({}, helper.secondUser);
        emptyField[field] = '';
        db.User.create(emptyField)
          .then()
          .catch((error) => {
            expect(error.errors[0].message)
              .toEqual('This field cannot be empty');
            expect(error.errors[0].type).toEqual('Validation error');
            expect(error.errors[0].path).toEqual(field);
            done();
          });
      });
    });
  });

  describe('Update user', () => {
    const updatedUser = {};
    beforeEach((done) => {
      const updateD = { firstname: 'olawale', password: 'newnewnewnew' };
      db.User.findById(regularUser.id)
        .then((user) => {
          user.update(updateD)
          .then((upUser) => {
            Object.assign(updatedUser, upUser.dataValues);
            done();
          });
        });
    });

    it('ensures password is hashed', (done) => {
      db.User.findById(updatedUser.id)
        .then((user) => {
          expect(user.dataValues.id).toEqual(regularUser.id);
          expect(user.dataValues.firstname).toNotEqual(regularUser.firstname);
          expect(user.dataValues.email).toEqual(regularUser.email);
          done();
        });
    });
  });
});
