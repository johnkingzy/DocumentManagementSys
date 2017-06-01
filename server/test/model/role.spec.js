import expect from 'expect';
import db from '../../app/models';
import helper from '../helper/test-helper';

describe('ROLE', () => {
  let guestRole;

  describe('Create Role', () => {
    it('should create a role', (done) => {
      db.Role.create(helper.guestRole)
        .then((role) => {
          guestRole = role.dataValues;
          expect(role.dataValues.title).toEqual(helper.guestRole.title);
          done();
        });
    });

    it('should fail when role title already exist', (done) => {
      const newRole = { title: 'guest' };
      db.Role.create(newRole)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).toEqual('role already exist');
          expect(error.errors[0].type).toEqual('unique violation');
          expect(error.errors[0].path).toEqual('title');
          expect(error.errors[0].value).toEqual('guest');
          done();
        });
    });
  });

  describe('NOT NULL violation', () => {
    it('should fail when title of a role is null', (done) => {
      const nullTitle = { title: null };
      db.Role.create(nullTitle)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).toEqual('title cannot be null');
          expect(error.errors[0].type).toEqual('notNull Violation');
          expect(error.errors[0].value).toEqual(null);
          done();
        });
    });
  });

  describe('EMPTY String violation', () => {
    it('should fail for empty string title', (done) => {
      const emptyTitle = { title: ' ' };
      db.Role.create(emptyTitle)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).toEqual('Input a valid title');
          expect(error.errors[0].type).toEqual('Validation error');
          expect(error.errors[1].message)
            .toEqual('This field cannot be empty');
          done();
        });
    });
  });

  describe('Update Role', () => {
    let newRole;
    before((done) => {
      db.Role.findById(guestRole.id)
        .then((role) => {
          role.update({ title: 'fellow' })
            .then((updatedRole) => {
              newRole = updatedRole;
              done();
            });
        });
    });

    it('should update a role', (done) => {
      db.Role.findById(newRole.id)
        .then((role) => {
          expect(role.dataValues.id).toEqual(guestRole.id);
          expect(role.dataValues.title).toNotEqual(guestRole.title);
          expect(role.dataValues.title).toEqual('fellow');
          done();
        });
    });
  });

  describe('DELETE role', () => {
    it('should delete a role', (done) => {
      db.Role.destroy({ where: { id: guestRole.id } })
        .then(() => {
          db.Role.findById(guestRole.id)
            .then((res) => {
              expect(res).toEqual(null);
              done();
            });
        });
    });
  });
});
