import expect from 'expect';
import db from '../../app/models';
import helper from '../helper/test-helper';

describe('Document Model', () => {
  let userDocument;
  let regularUser;
  const requiredFields = ['title', 'content'];
  const emptyFields = ['title', 'content', 'access'];
  before((done) => {
    db.User.create(helper.regularUser)
      .then((user) => {
        regularUser = user.dataValues;
        done();
      });
  });

  after((done) => {
    db.User.destroy({ where: {
      id: regularUser.id
    }
    });
    done();
  });

  describe('CREATE Document', () => {
    it('should create a document', (done) => {
      helper.publicDocument.ownerRoleId = regularUser.roleId;
      helper.publicDocument.ownerId = regularUser.id;
      db.Document.create(helper.publicDocument)
        .then((doc) => {
          userDocument = doc.dataValues;
          expect(doc.dataValues.title).toEqual(helper.publicDocument.title);
          expect(doc.dataValues.content)
            .toEqual(helper.publicDocument.content);
          expect(doc.dataValues).toIncludeKey('createdAt');
          expect(doc.dataValues.ownerId).toEqual(regularUser.id);
          done();
        });
    });
  });

  describe('Not Null Violation', () => {
    requiredFields.forEach((field) => {
      it('should return "not null Violation message"', (done) => {
        const notNull = Object.assign({}, helper.publicDocument);
        notNull[field] = null;
        db.Document.create(notNull)
          .then()
          .catch((error) => {
            expect(error.errors[0].message).toEqual(`${field} cannot be null`);
            expect(error.errors[0].type).toEqual('notNull Violation');
            expect(error.errors[0].path).toEqual(field);
            expect(error.errors[0].value).toEqual(null);
            done();
          });
      });
    });
  });

  describe('EMPTY STRING AS INPUT', () => {
    emptyFields.forEach((field) => {
      it('should return error when empty string is passed', (done) => {
        const emptyString = Object.assign({}, helper.publicDocument);
        emptyString[field] = ' ';
        db.Document.create(emptyString)
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

  describe('ACCESS Violation', () => {
    it('should return error when access is not public, private or role',
    (done) => {
      const accessError = Object.assign({}, helper.publicDocument);
      accessError.access = 'andela';
      db.Document.create(accessError)
        .then()
        .catch((error) => {
          expect(error.errors[0].message)
            .toEqual('public, private or role required');
          expect(error.errors[0].type).toEqual('Validation error');
          expect(error.errors[0].path).toEqual('access');
          done();
        });
    });
  });

  describe('UPDATE Document', () => {
    let newDocument;
    beforeEach((done) => {
      db.Document.findById(userDocument.id)
        .then((doc) => {
          doc.update({ title: 'new andela book' })
            .then((updatedDocument) => {
              newDocument = updatedDocument;
              done();
            });
        });
    });

    it('should return the correct result', (done) => {
      db.Document.findById(userDocument.id)
        .then((doc) => {
          expect(doc.dataValues.id).toEqual(newDocument.id);
          expect(doc.dataValues.title).toEqual('new andela book');
          expect(doc.dataValues.content).toEqual(userDocument.content);
          expect(doc.dataValues.access).toEqual(userDocument.access);
          expect(doc.dataValues.ownerId).toEqual(userDocument.ownerId);
          done();
        });
    });
  });
});
