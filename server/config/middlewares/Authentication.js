import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
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
    req.checkBody(
      {
        username: {
          notEmpty: true,
          isLength: {
            options: [{ min: 5, max: 15 }],
            errorMessage: 'Please provide a username with atleast 5 characters. Max 15'
          },
          errorMessage: 'Your Username is required'
        },
        email: {
          notEmpty: true,
          isEmail: {
            errorMessage: 'Please provide a valid a Email Adrress'
          }
        },
        firstname: {
          notEmpty: true,
          errorMessage: 'Your Firstname is required'
        },
        lastname: {
          notEmpty: true,
          errorMessage: 'Your Lastname is required'
        },
        password: {
          notEmpty: true,
          isLength: {
            options: [{ min: 8 }],
            errorMessage: 'Please provide a valid password with minimum of 8 characters'
          },
        }
      }
    );
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = helper.getErrors(errors);
      return res.status(400)
      .send(allErrors);
    }
    req.userData = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
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
        return res.status(400)
      .send(user.dataValues.email);
      }
      if (user.dataValues.email === req.body.email) {
        return res.status(400)
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
    db.User.findOne(
      {
        where: {
          username: req.body.username
        }
      })
      .then((user) => {
        if (!user) {
          return res.json({
            success: false,
            message: 'Authentication failed. Please enter a username'
          });
        } else if (user) {
          if (user.password !== req.body.password) {
            return res.json({
              success: false,
              message: 'Authentication failed. Incorrect password.'
            });
          }
          next();
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
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, key, (error, decoded) => {
        if (error) {
          return res.json({
            success: false,
            message: 'Failed to Authenticate Token',
            error
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403)
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
    const currentUser = req.decoded.user,
      userId = req.params.id;
    if (!helper.isAdmin(currentUser.roleId) && userId === 1) {
      return res.status(403)
      .send(
        {
          success: false,
          message: 'You don\'t have permissions to edit an admin details'
        }
      );
    }
    if (!helper.isOwner(req)) {
      return res.status(401)
      .send({
        success: false,
        message: 'You are not allowed to edit someone\'s else profile'
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
          message: 'You are not allowed to set the admin roleId'
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
    db.User.findById(userId)
    .then((user) => {
      if (user) {
        if (!helper.isAdmin(user.roleId) && user.id !== currentUserId) {
          req.userData = user;
          next();
        } else {
          return res.status(403)
          .send(
            {
              success: false,
              message: 'You are not allowed to delete an Admin'
            }
          );
        }
      } else {
        return res.status(403)
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
    db.Document.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404)
        .send(
          {
            success: false,
            message: 'Document not found'
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
      if (!helper.publicAccess && !helper.roleAccess) {
        return res.status(500)
        .send(
          { success: false,
            message: 'You are not allowed to view this documents'
          });
      }
      if (helper.roleAccess && currentUser.roleId !== document.ownerRoleId) {
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
      if (!access.includes(req.body.access)) {
        return res.status(400)
        .send(
          {
            success: false,
            message: 'Document access level can only be set to public, private, or role'
          }
        );
      }
      req.document = document;
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
