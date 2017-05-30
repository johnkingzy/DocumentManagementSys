import faker from 'faker';
import bcrypt from 'bcrypt';
import db from '../../app/models';

/**
 * hashPassword
 * convert plain test to a bcrypt hash
 * @param {String} plainPassword plain test
 * @returns {String} bcrypt hash value of the plain password
 */
const hashPassword = plainPassword =>
  bcrypt.hashSync(plainPassword, 10);

export const roles = [{
  title: 'admin'
}, {
  title: 'regular'
}];

export const users = [{
  firstname: 'Solomon',
  lastname: 'Kingsley',
  username: 'maximuf',
  email: 'Solomon@email.com',
  password: hashPassword('password123'),
  roleId: 1

}, {
  firstname: 'Abdulrasaq',
  lastname: 'Nosirudeen',
  username: 'dealwap',
  email: 'dealwap@gmail.com',
  password: hashPassword('password'),
  roleId: 1
}, {
  firstname: 'Alienyi',
  lastname: 'David',
  username: 'pythagoras',
  email: 'pythagoras@gmail.com',
  password: hashPassword('pythagoras'),
  roleId: 2
}];

export const documents = [{
  title: 'seed document test',
  content: faker.lorem.paragraph(),
  access: 'private',
  ownerId: 1,
  ownerRoleId: '1'
}, {
  title: 'public seed document test',
  content: faker.lorem.paragraph(),
  access: 'public',
  ownerId: 1,
  ownerRoleId: '1'
}];
const seeds = () => {
  db.sequelize.sync({ force: true }).then(() => {
    db.Role.bulkCreate(roles);
    db.User.bulkCreate(users, { individualHooks: true }).then(() => {
      db.Document.bulkCreate(documents);
    });
  });
};

export default seeds();
