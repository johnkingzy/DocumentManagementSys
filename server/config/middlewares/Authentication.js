import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../../app/models';
import helper from '../../app/controllers/helpers';

dotenv.config();
const key = process.env.SECRET_KEY;
const Authenticate = {
  /**
   * validateInput - Validates Users Input
   * @param  {object} req request object
   * @param  {type} res  response object
   * @param  {type} next callback function
   * @return {void} void no return
   */
  validateInput(req, res, next) {
    const userNameError = 'Please provide a username with atleast 5 characters.'; //eslint-disable-line
    req.checkBody(
      {
        username: {
          notEmpty: true,
          isLength: {
            options: [{ min: 5 }],
            errorMessage: userNameError
          },
          errorMessage: 'Your Username is required'
        },
        email: {
          notEmpty: true,
          isEmail: {
            errorMessage: 'Provide a valid a Email Adrress'
          },
          errorMessage: 'Your Email Address is required'
        },
        firstname: {
          notEmpty: true,
          isAlpha: {
            errorMessage: 'firstname should contain chararcters only'
          },
          errorMessage: 'Your Firstname is required'
        },
        lastname: {
          notEmpty: true,
          isAlpha: {
            errorMessage: 'lastname should contain chararcters only'
          },
          errorMessage: 'Your Lastname is required'
        },
        password: {
          notEmpty: true,
          isLength: {
            options: [{ min: 8 }],
            errorMessage: 'Provide a valid password with minimum of 8 characters' // eslint-disable-line
          },
          errorMessage: 'Your Password is required'
        }
      }
    );
    const errors = req.validationErrors();
    if (errors) {
      const error = helper.getErrors(errors);
      return res.status(409)
      .json({
        message: error[0]
      });
    }
    const password = bcrypt.hashSync(req.body.password, 10);
    req.userData = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password,
      roleId: req.body.roleId
    };
    db.User.findOne(
      {
        where: {
          username: req.body.username,
          $or: {
            email: req.body.email
          }
        }
      }
  )
  .then((user) => {
    if (user) {
      if (user.dataValues.username === req.body.username) {
        return res.status(409)
        .send(
          {
            success: false,
            message: 'Username already exist'
          }
        );
      }
      if (user.dataValues.email === req.body.email) {
        return res.status(409)
      .send(
          {
            success: false,
            message: 'Email Address already exist'
          }
      );
      }
    } else {
      next();
    }
  });
  },
  /**
   * authenticate - authenticate a user
   * @param  {object} req  request object
   * @param  {object} res  response object
   * @param  {function} next callback function
   * @return {void} no return or void
   */
  authenticate(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400)
        .json({
          success: false,
          message: 'Please provide your username or password to login'
        });
    }
    db.User.findOne(
      {
        where: {
          username: req.body.username
        }
      })
      .then((user) => {
        if (user &&
          bcrypt.compareSync(req.body.password, user.password)) {
          next();
        } else {
          return res.status(401)
            .json({
              success: false,
              message: 'Invalid Credentials.'
            });
        }
      });
  },
  /**
   * isLoggedIn - checks if a user looged in
   * @param  {object} req  request object
   * @param  {object} res  response object
   * @param  {function} next callback function
   * @return {void} no return or void
   */
  isLoggedIn(req, res, next) {
    const authorizationHeader = req.headers.authorization ||
    req.headers['x-access-token'];
    let token;
    if (req.headers.authorization) {
      token = authorizationHeader.split(' ')[1];
    } else {
      token = authorizationHeader;
    }
    if (token) {
      jwt.verify(token, key, (error, decoded) => {
        if (error) {
          res.status(401)
              .send({
                success: false,
                message: 'Failed to Authenticate Token',
                error
              });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401)
        .send({
          success: false,
          message: 'Access denied, Authentication token does not exist'
        });
    }
  },
  /**
   * checkAdmin - checks if a user is an admin
   * @param  {object} req  request object
   * @param  {type} res  response object
   * @param  {function} next callback function
   * @return {void} no return or void
   */
  checkAdmin(req, res, next) {
    const currentUser = req.decoded;
    if (!helper.isAdmin(currentUser.user.roleId)) {
      return res.status(403)
      .send(
        {
          success: false,
          message: 'Access denied, only Admins are allowed'
        }
      );
    }
    next();
  },

  /**
   * validateUpdate - Validates a User's Profile Updates
   * @param  {object} req request object
   * @param  {object} res response object
   * @param  {function} next callback function
   * @return  {void} no return or void
   */
  validateUpdate(req, res, next) {
    const userNameError = 'Provide a valid username with atleast 5 characters.(alphanumeric)'; //eslint-disable-line
    if (req.body.email) {
      req.checkBody('email',
      'Please provide a valid email address').isEmail();
    }
    if (req.body.username) {
      req.checkBody('username',
      userNameError).isUsername();
    }
    if (req.body.firstname) {
      req.checkBody('firstname',
    'firstname should contain chararcters only').isAlpha();
    }
    if (req.body.lastname) {
      req.checkBody('lastname',
    'lastname should contain chararcters only').isAlpha();
    }
    if (req.body.password) {
      req.checkBody(
        {
          password: {
            isLength: {
              options: [{ min: 8 }],
              errorMessage: 'Provide a valid password with a minimum of 8 characters' // eslint-disable-line
            }
          }
        });
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const errors = req.validationErrors();
    if (errors) {
      const error = helper.getErrors(errors);
      return res.status(409)
      .send({
        error
      });
    }
    const currentUser = req.decoded.user,
      userId = req.params.id;
    if (isNaN(userId)) {
      return res.status(400)
          .send({
            message: 'An Error occured, please contact admin'
          });
    }
    if (!helper.isAdmin(currentUser.roleId) && userId === 1) {
      return res.status(403)
      .send(
        {
          success: false,
          message: 'You don\'t have permissions to edit an admin details'
        }
      );
    }
    if (!helper.isOwner(req) && currentUser.roleId !== 1) {
      return res.status(403)
      .send({
        success: false,
        message: 'Unauthorized Access'
      });
    }
    if (req.body.id) {
      return res.status(403)
      .send({
        success: false,
        message: 'You are not allowed to edit your id'
      });
    }
    if (req.body.roleId && req.body.roleId === '1') {
      if (!helper.isAdmin(currentUser.roleId)) {
        return res.status(403)
        .send({
          success: false,
          message: 'You are not allowed to set the roleId'
        });
      }
    }
    db.User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404)
        .send({
          success: false,
          message: 'User does not exist'
        });
      }
      req.userData = user;
      next();
    });
  },

  /**
   * validateDelete - validates deleting of a user
   * @param  {object} req  request object
   * @param  {object} res  response object
   * @param  {function} next callback function
   * @return {void}  no return or void
   */
  validateDelete(req, res, next) {
    const userId = req.params.id;
    const currentUserId = req.decoded.user.id;
    if (isNaN(userId)) {
      return res.status(400)
        .send({
          success: false,
          message: 'An Error Occured while deleting user'
        });
    }
    db.User.findById(userId)
    .then((user) => {
      if (user) {
        if (helper.isAdmin(user.roleId) && user.id === 1) {
          return res.status(403)
          .send(
            {
              success: false,
              message: 'You are not allowed to delete the default Admin'
            }
          );
        }
        if (helper.isAdmin(user.roleId) && user.id === currentUserId) {
          return res.status(403)
          .send(
            {
              success: false,
              message: 'You are not allowed to delete your own account'
            }
          );
        }
        req.userData = user;
        next();
      } else {
        return res.status(404)
        .send(
          {
            success: false,
            message: 'The user you trying to delete does not exist'
          }
        );
      }
    });
  },
  /**
   * validateDocument - validate Document before created
   * @param  {object} req request object
   * @param  {object} res  response object
   * @param  {function} next callback function
   * @return {void} no return or void
   */
  validateDocument(req, res, next) {
    const title = req.body.title,
      content = req.body.content;
    if (!title) {
      return res.status(403)
      .send(
        {
          success: false,
          message: 'Please type in a title for the document'
        }
      );
    }
    if (!content || content.length < 10) {
      return res.status(403)
      .send(
        {
          success: false,
          message: 'Please type in content with a minimum of 10 characters'
        }
      );
    }
    req.Document = {
      title,
      content,
      access: req.body.access,
      ownerId: req.decoded.user.id,
      ownerRoleId: req.decoded.user.roleId
    };
    next();
  },

  /**
   * checkAccess - checks if a user has the access to view a document
   * @param  {object} req  request object
   * @param  {type} res  response object
   * @param  {type} next callback function
   * @return {void} no return or void
   */
  checkAccess(req, res, next) {
    if (isNaN(req.params.id)) {
      return res.status(400).send({
        message: 'Error occurred while retrieving documents'
      });
    }
    db.Document.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404)
        .send(
          {
            success: false,
            message: 'Document Not found'
          }
        );
      }
      const document = result.dataValues;
      const currentUser = req.decoded.user;
      const userRoleId = currentUser.roleId;
      if (document.ownerId !== currentUser.id && !helper.isAdmin(userRoleId)) {
        return res.status(500)
        .send(
          {
            success: false,
            message: 'You are not allowed to view this documents'
          }
        );
      }
      if (!helper.publicAccess(document) && !helper.roleAccess(document)) {
        return res.status(500)
        .send(
          { success: false,
            message: 'You are not allowed to view this documents'
          });
      }
      if (helper.roleAccess(document)
      && currentUser.roleId !== document.ownerRoleId) {
        return res.status(500)
        .send(
          {
            success: false,
            message: 'You are not allowed to view this document'
          }
        );
      }
      req.document = result;
      next();
    });
  },

  /**
   * checkDocument - checks if a document belongs to the user
   * @param  {object} req  request object
   * @param  {object} res  response object
   * @param  {function} next callback function
   * @return {void} no return or void
   */
  checkDocument(req, res, next) {
    if (isNaN(req.params.id)) {
      return res.status(400).send({
        message: 'Error occured while retrieving role'
      });
    }
    const currentUser = req.decoded.user;
    const access = ['public', 'private', 'role'];
    db.Document.findById(req.params.id)
    .then((document) => {
      if (!document) {
        return res.status(400)
        .send(
          {
            success: false,
            message: 'Document not found'
          }
        );
      }
      if (document.ownerId !== currentUser.id) {
        return res.status(500)
        .send(
          {
            success: false,
            message: 'You don\'t have write permissions on this document'
          }
        );
      }
      if (req.body.access && !access.includes(req.body.access)) {
        const message = `Document access level can only
        be set to public, private, or role`;
        return res.status(400)
        .send(
          {
            success: false,
            message
          }
        );
      }
      if (req.body.id) {
        return res.status(403)
        .send(
          {
            success: false,
            message: 'You are not allowed to edit the document id'
          }
        );
      }
      req.document = document;
      next();
    });
  },

  /**
  * Validate search
  * @param {Object} req req object
  * @param {Object} res response object
  * @param {Object} next Move to next controller handler
  * @returns {void|Object} response object or void
  *
  */
  validateSearch(req, res, next) {
    const query = {};
    const terms = [];
    const userQuery = req.query.query;
    const searchArray =
       userQuery ? userQuery.toLowerCase().match(/\w+/g) : null;
    const limit = req.query.limit;
    const offset = req.query.offset || 0;
    const documentOrder = req.query.documentOrder;
    const order =
       documentOrder && documentOrder === 'ASC' ? documentOrder : 'DESC';

    if (limit && (limit < 0 || !/^([1-9]\d*|0)$/.test(limit))) {
      return res.status(400)
         .send({
           message: 'Only positive number is allowed for limit value'
         });
    }
    if (offset < 0 || !/^([1-9]\d*|0)$/.test(offset)) {
      return res.status(400)
         .send({
           message: 'Only positive number is allowed for offset value'
         });
    }

    if (searchArray) {
      searchArray.forEach((word) => {
        terms.push(`%${word}%`);
      });
    }
    query.limit = limit;
    query.offset = offset;
    query.order = [['createdAt', order]];

    if (`${req.baseUrl}${req.route.path}` === '/users/search') {
      if (!req.query.query) {
        return res.status(400)
           .send({
             message: 'Please enter a search query'
           });
      }
      query.where = {
        $or: [
           { username: { $iLike: { $any: terms } } },
           { firstname: { $iLike: { $any: terms } } },
           { lastname: { $iLike: { $any: terms } } },
           { email: { $iLike: { $any: terms } } }
        ]
      };
      if (!req.query.limit) {
        query.limit = 10;
      }
    }
    if (`${req.baseUrl}${req.route.path}` === '/users/:id/documents') {
      if (isNaN(req.params.id)) {
        return res.status(400)
        .send({
          success: false,
          message: 'Error occurred while retrieving user document'
        });
      }
      query.where = {
        $or: [
          { access: 'public' },
          {
            ownerRoleId: req.decoded.roleId
          },
          {
            ownerId: req.params.id
          }
        ]
      };
      query.include = [
        {
          model: db.User,
          attributes: [
            'id',
            'username',
            'firstname',
            'lastname',
            'email',
            'roleId'
          ]
        }
      ];
      query.order = [['updatedAt', 'DESC']];
    }
    if (`${req.baseUrl}${req.route.path}` === '/documents/') {
      if (helper.isAdmin(req.decoded.user.roleId)) {
        query.where = {};
      }
      query.include = [
        {
          model: db.User,
          attributes: [
            'id',
            'username',
            'firstname',
            'lastname',
            'email',
            'roleId'
          ]
        }
      ];
    }
    if (`${req.baseUrl}${req.route.path}` === '/users/') {
      query.where = helper.isAdmin(req.decoded.user.roleId)
         ? {}
         : { id: req.decoded.user.id };
      query.attributes = [
        'id',
        'username',
        'firstname',
        'lastname',
        'email',
        'roleId'
      ];
    }
    if (`${req.baseUrl}${req.route.path}` === '/users/:id') {
      if (!helper.isOwner(req) && req.decoded.user.roleId !== 1) {
        return res.status(403)
        .send({
          success: false,
          message: 'Unauthorized Access'
        });
      }
    }
    if (`${req.baseUrl}${req.route.path}` === '/documents/search') {
      if (!req.query.query) {
        return res.status(400)
           .send({
             message: 'Please enter a search query'
           });
      }
      if (helper.isAdmin(req.decoded.user.roleId)) {
        query.where = helper.likeSearch(terms);
      } else {
        query.where = {
          $and: [helper.documentAccess(req), helper.likeSearch(terms)]
        };
      }
      query.include = [
        {
          model: db.User,
          attributes: [
            'id',
            'username',
            'firstname',
            'lastname',
            'email',
            'roleId'
          ]
        }
      ];
      if (!req.query.limit) {
        query.limit = 6;
      }
    }
    if (`${req.baseUrl}${req.route.path}` === '/users/:id/documents') {
      const userSearch = {
        ownerId: req.params.id
      };
      query.where = userSearch;
    }
    req.searchFilter = query;
    next();
  },

  /**
   * Check for role edit and delete permission
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @return {Object} response object
   */
  checkRolePermission(req, res, next) {
    if (isNaN(req.params.id)) {
      return res.status(400).send({
        message: 'Error occured while retrieving role'
      });
    }
    db.Role.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404)
            .send({
              message: 'This role does not exist'
            });
        }
        if (helper.isAdmin(role.id) || helper.isRegular(role.id)) {
          return res.status(403)
            .send({
              message: 'You are not permitted to modify this role'
            });
        }
        req.roleInstance = role;
        next();
      });
  },

  /**
   * deleteDocument - delete a document
   * @param  {object} req  request object
   * @param  {object} res  response object
   * @param  {type} next callback function
   * @return {void} no return or void
   */
  deleteDocument(req, res, next) {
    if (isNaN(req.params.id)) {
      return res.status(400).send({
        message: 'Error occured while deleting document'
      });
    }
    db.Document.findById(req.params.id)
    .then((document) => {
      if (!document) {
        return res.status(400)
        .send(
          {
            success: false,
            message: 'Document not found'
          }
        );
      }
      if (document.ownerId !== req.decoded.user.id) {
        return res.status(400)
        .send(
          {
            success: false,
            message: 'You don\'t have permissions to delete this document'
          });
      }
      req.Document = document;
      next();
    });
  }

};
export default Authenticate;
