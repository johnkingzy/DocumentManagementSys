## Document Management System (FullStack)

[![Coverage Status](https://coveralls.io/repos/github/andela-ksolomon/DocumentManagementSys/badge.svg?branch=development)](https://coveralls.io/github/andela-ksolomon/DocumentManagementSys?branch=development)
 [![Code Climate](https://codeclimate.com/github/andela-ksolomon/DocumentManagementSys/badges/gpa.svg)](https://codeclimate.com/github/andela-ksolomon/DocumentManagementSys)
[![Build Status](https://travis-ci.org/andela-ksolomon/DocumentManagementSys.svg?branch=development)](https://travis-ci.org/andela-ksolomon/DocumentManagementSys)

Document Management System provides a restful API for users to create and manage documents giving different privileges based on user roles and managing authentication using JWT.

## Application Features
###### User Authentication
Users are authenticated and validated using JWT web token. Generating tokens on signup and login ensures documents and API endpoints are protected.

###### Document Management
*   Create an account
*   Login with your credentials
*   Create new document specifying document title, content and document access
*   Edit Documents
*   Delete documents
*   View public documents created by other users.
*   View documents created by his access group with access level set as `role`.
*   Search a users public documents.
*   View `public` and `role` access level documents of other regular users.
*   Share document with specific user(s) - Upcoming
*   Share document across multiple users - Upcoming
*   Backup Documents to Google Drive or DropBox - Upcoming
*   Print Documents Directly from Platform - Upcoming
*   Share Documents via Email - Upcoming
*   Logout

-   In addition to the general user functions, an admin user can:
    -   View all users.
    -   View all created documents except documents with access set to private.
    -   Delete any user.
    -   Create a new role.
    -   Search for any user.

## Hosted App on Heroku
[DataHub](https://datahubs.herokuapp.com/)

## API Documentation
- View API endpoints and their functions [here](http://datahubs.getforge.io/)

## Technologies Used
- **[JavaScript ES6](http://es6-features.org/)** - Codes were written in javascript to enhance HTML pages.
- **[ReactJS](https://facebook.github.io/react/)** - React is an open-source JavaScript library for building user interfaces.
- **[NodeJS](https://nodejs.org/)** - Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.
- **[ExpressJS](https://expressjs.com/)** - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. I used this framework for routing.
- **[PostgreSQL](https://www.postgresql.org/)** - Postgres is an object-relational database management system (ORDBMS) with an emphasis on extensibility and standards compliance.
- **[Sequelize](http://docs.sequelizejs.com/)** - Sequelize is a promise-based ORM for Node.js which supports the dialects of PostgreSQL and features solid transaction support, relations, read replication and more.

### **Installation Steps**
* Ensure you have `node` installed or install [Node](https://nodejs.org/en/download/)
* Clone the project repository from your terminal `git clone https://github.com/andela-moseni/document-mgt-system.git`
* Change directory into the `document-mgt-system` directory
* Run `npm install` to install the dependencies in the `package.json` file
* Run `npm run dev-start` to start the project
* Run `npm test` to run the server-side(api) tests
* Run `npm run test-e2e` to run the e2e tests
* Run `npm run client:test` to run the client-side(React) tests
* Use [Postman](https://www.getpostman.com/) or any API testing tool of your choice to access the endpoints

### **Endpoints**
**N/B:** For all endpoints that require authentication, use \
`'x-access-token': <token>` or `authorization: <token>`

#### Limitations:
The limitations to the **Document Management System API** are as follows:
* Users can only create plain textual documents and retrieve same when needed
* Users cannot share documents with people, but can make document `public` to make it available to other users


### How to Contribute
Contributors are welcome to further enhance the features of this API by contributing to its development. The following guidelines should guide you in contributing to this project:

1. Fork the repository.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request describing the feature(s) you have added
6. Include a `feature.md` readme file with a detailed description of the feature(s) you have added, along with clear instructions of how to use the features(s) you have added. This readme file will be reviewed and included in the original readme if feature is approved.

Ensure your codes follow the [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)
