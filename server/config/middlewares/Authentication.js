import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../../app/models';
import helper from '../../app/controllers/helpers';

dotenv.config();
const key = process.env.SECRET_KEY;
const Authenticate = {
  /**
   * ValidateInput - Validates Users Input
   * @param  {object} req request object
   * @param  {type} res  response object
   * @param  {type} next callback function
   * @return {void} void no return
   */
  ValidateInput(req, res, next) {
    const username = req.body.username,
      email = req.body.email,
      firstname = req.body.firstname,
      password = req.body.password,
      lastname = req.body.lastname;
    if (!username) {
      return res.status(400)
        .send({
          message: 'Provide a valid username'
        });
    }

    if (!email) {
      return res.status(400)
        .send({
          message: 'Provide a valid email address'
        });
    }

    if (!firstname) {
      return res.status(400)
        .send({

          message: 'Your firstname is required'
        });
    }

    if (!password) {
      return res.status(400)
        .send({
          message: 'Your password cannot be empty'
        });
    }

    if (!lastname) {
      return res.status(400)
        .send({
          message: 'Your lastname is required'
        });
    }
    req.userData = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      roleId: req.body.roleId
    };
    next();
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
          res.json({
            success: false,
            message: 'Authentication failed. Please enter a username'
          });
        } else if (user) {
          if (user.password !== req.body.password) {
            res.json({
              success: false,
              message: 'Authentication failed. Incorrect password.'
            });
          } else {
            next();
          }
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
   * isAdmin - checks if a user is an admin
   * @param  {object} req  request object
   * @param  {type} res  response object
   * @param  {function} next callback function
   * @return {void} no return or void
   */
  isAdmin(req, res, next) {
    const currentUser = req.decoded;
    if (helper.isAdmin(currentUser.user.roleId)) {
      return res.status(403)
      .send('Access denied, only Admins are allowed');
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
  validateUpdate: (req, res, next) => {
    const currentUser = req.decoded.user,
      userId = req.params.id;
    if (!helper.isAdmin(currentUser.roleId) && userId === 1) {
      return res.status(403)
      .send('You are not permitted to edit an admin details');
    }
    if (!helper.isOwner(req)) {
      return res.status(401)
      .send({
        message: 'You are not allowed to edit someone\'s else profile'
      });
    }
    if (req.body.id) {
      res.status(403)
      .send({
        message: 'You are not allowed to edit your id'
      });
    }
    if (req.body.roleId && req.body.roleId === '1') {
      if (!helper.isAdmin(currentUser.roleId)) {
        return res.status(403)
        .send({
          message: 'You are not allowed to set the admin roleId'
        });
      }
    }
    db.User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404)
        .send({
          message: 'User does not exist'
        });
      }
      req.userData = user;
      next();
    });
  }
};
export default Authenticate;
