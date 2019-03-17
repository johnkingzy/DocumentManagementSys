import faker from 'faker';

const helper = {
  newRole: {
    title: 'moderator'
  },

  guestRole: {
    title: 'guest'
  },

  adminUser: {
    firstname: (`${faker.name.findName()}first`).replace(/\W+/g, ''),
    lastname: (`${faker.name.findName()}lastname`).replace(/\W+/g, ''),
    username: (`${faker.internet.userName()}username`).replace(/\s+/, ''),
    email: faker.internet.email(),
    password: (`${faker.internet.password()}passkey`).replace(/\s+/, ''),
    roleId: 1
  },

  administrator: {
    firstname: (`${faker.name.findName()}first`).replace(/\W+/g, ''),
    lastname: (`${faker.name.findName()}last`).replace(/\W+/g, ''),
    username: 'dealwap',
    email: 'dealwap@gmail.com',
    password: 'password',
    roleId: 1
  },

  regUser: {
    firstname: (`${faker.name.findName()}sure`).replace(/\W+/g, ''),
    lastname: (`${faker.name.findName()}well`).replace(/\W+/g, ''),
    username: (`${faker.internet.userName()}username`).replace(/\s+/, ''),
    email: faker.internet.email(),
    password: (`${faker.internet.password()}passkey`).replace(/\s+/, ''),
    roleId: 2
  },

  regular: {
    firstname: (`${faker.name.findName()}sure`).replace(/\W+/g, ''),
    lastname: (`${faker.name.findName()}last`).replace(/\W+/g, ''),
    username: 'pythagoras',
    email: 'pythagoras@gmail.com',
    password: 'pythagoras',
    roleId: 2
  },
  firstUser: {
    username: (`${faker.internet.userName()}username`).replace(/\s+/, ''),
    firstname: (`${faker.name.findName()}sure`).replace(/\W+/g, ''),
    lastname: (`${faker.name.findName()}last`).replace(/\W+/g, ''),
    email: faker.internet.email(),
    password: (`${faker.internet.password()}passkey`).replace(/\s+/, '')
  },
  secondUser: {
    username: (`${faker.internet.userName()}username`).replace(/\s+/, ''),
    firstname: (`${faker.name.findName()}sure`).replace(/\W+/g, ''),
    lastname: (`${faker.name.findName()}last`).replace(/\W+/g, ''),
    email: faker.internet.email(),
    password: (`${faker.internet.password()}passkey`).replace(/\s+/, '')
  },
  thirdUser: {
    username: (`${faker.internet.userName()}username`).replace(/\s+/, ''),
    firstname: (`${faker.name.findName()}sure`).replace(/\W+/g, ''),
    lastname: (`${faker.name.findName()}last`).replace(/\W+/g, ''),
    email: faker.internet.email(),
    password: (`${faker.internet.password()}passkey`).replace(/\s+/, '')
  },
  docUser: {
    firstname: (`${faker.name.findName()}sure`).replace(/\W+/g, ''),
    lastname: (`${faker.name.findName()}last`).replace(/\W+/g, ''),
    username: (`${faker.internet.userName()}username`).replace(/\s+/, ''),
    email: faker.internet.email(),
    password: (`${faker.internet.password()}passkey`).replace(/\s+/, ''),
    roleId: 2
  },

  adminDocUser: {
    firstname: (`${faker.name.findName()}sure`).replace(/\W+/g, ''),
    lastname: (`${faker.name.findName()}last`).replace(/\W+/g, ''),
    username: 'johnkingzyjohn',
    email: faker.internet.email(),
    password: 'maximufi123',
    roleId: 1
  },
  anotherUser: {
    firstname: (`${faker.name.findName()}sure`).replace(/\W+/g, ''),
    lastname: (`${faker.name.findName()}last`).replace(/\W+/g, ''),
    username: 'mywife',
    email: faker.internet.email(),
    password: 'mywife123',
    roleId: 1
  },
  regularUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  invalidEmailUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'kkkkk',
    password: faker.internet.password()
  },
  invalidPasswordUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'men'
  },
  privateDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private',
  },

  publicDocument: {
    title: 'This is a new document in test',
    content: faker.lorem.paragraph(),
    access: 'public',
  },

  documentWithoutAccess: {
    title: 'This is a new document in test',
    content: faker.lorem.paragraph(),
    access: null,
  },

  sharedDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public',
  },

  roleDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'role',
  },

  shared: {
    email: faker.internet.email(),
    canEdit: true,
    documentId: 1
  }
};

export default helper;
