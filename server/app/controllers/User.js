// import jwt from 'jsonwebtoken';
import omit from 'lodash/omit';
import db from '../models/';
import Helpers from './helpers';

const User = {

  /**  create - Registers a new user
   *   Route: POST: /users
   *  @param {object} req request object
   *  @param {object} res response object
   */
  create(req, res) {
    db.User
      .create(req.userData)
      .then((user) => {
        const token = Helpers.createToken(user);
        const filteredData = omit(user.dataValues, [
          'password',
        ]);
        res.status(200)
          .send({
            message: 'User was created Successfully',
            user: filteredData,
            token
          });
      })
      .catch(error =>
        res.status(400)
        .send(error));
  },

  /** login - logs a user in
   *  Route: POST: /users/login
   * @param {object} req request object
   * @param {object} res response object
   */
  login(req, res) {
    db.User
    .findOne({
      where: { username: req.body.username }
    })
    .then((user) => {
      user
      .update(
        {
          active: true,
        }).then((result) => {
          const token = Helpers.createToken(result);
          const filteredData = omit(result.dataValues, [
            'password',
          ]);
          res.status(200)
          .json({
            success: true,
            message: 'Logged In Successfully',
            token,
            user: filteredData
          });
        });
    });
  },

  /** logout - logs a user out
   * Route: POST: /users/logout
   *  @param {object} req request object
   * @param {object} res response object
   * @return {void} no return
   */
  logout(req, res) {
    const userId = req.decoded.user.id;
    db.User.findById(userId).then((user) => {
      user
      .update(
        {
          active: false,
        }).then(() => {
          res.status(200)
          .send({
            success: true,
            message: 'You have successfully logged out'
          });
        });
    })
    .catch(error =>
        res.status(400)
        .send(error));
  },

  /** fetchAll - Fetches All Users
   * Route: GET: /users/
   * @param {object} req request object
   * @param {object} res response object
   */
  fetchAll(req, res) {
    db.User
      .findAndCountAll(req.searchFilter)
      .then((users) => {
        if (users) {
          const condition = {
            count: users.count,
            limit: req.searchFilter.limit,
            offset: req.searchFilter.offset
          };
          delete users.count;
          const pagination = Helpers.pagination(condition);
          res.status(200)
            .send({
              message: 'You have successfully retrieved all users',
              users,
              pagination
            });
        }
      });
  },

  /** fetchOne - Fetches One User based on params ID
   * Route: GET: /users/:id
   * @param {object} req request object
   * @param {object} res response object
   * @return {Object} returns a response
   */
  fetchOne(req, res) {
    const UserId = req.params.id;
    if (isNaN(UserId)) {
      return res.status(400)
        .send({
          success: false,
          message: 'Invalid type of user id. numbers only'
        });
    }
    db.User
    .findOne({
      where: { id: UserId }
    })
    .then((user) => {
      if (user) {
        const filteredData = omit(user.dataValues, [
          'password',
        ]);
        res.status(200)
        .send({
          user: filteredData
        });
      } else {
        res.status(404)
        .send(
          {
            success: false,
            message: 'User does not exist'
          }
          );
      }
    })
    .catch((error) => {
      res.send(error);
    });
  },

  /** updateUserData - Updates a user information
   * Route: PUT: /user/:id
   * @param {object} req request object
   * @param {object} res response object
   */
  updateUserData(req, res) {
    req.userData
      .update(req.body)
        .then((user) => {
          const filteredData = omit(user.dataValues, [
            'password',
          ]);
          res.status(200)
          .send({
            user: filteredData,
            success: true,
            message: 'Profile Info Updated Successfully'
          });
        })
        .catch(() => {
          res.status(403)
          .send({
            success: false,
            message: 'An Error Ocurred'
          });
        });
  },

  /**
   * deleteUser - Delete a User
   * @param  {object} req  request object
   * @param  {object} res  response object
   * @param  {function} next callback function
   * @return {void}  no return or void
   */
  deleteUser(req, res) {
    req.userData.destroy(
      {
        where: {
          id: req.userData.id
        }
      }
    )
    .then(() => {
      res.status(200)
        .send(
        {
          success: true,
          message: 'User was deleted successfully'
        }
      );
    });
  },

  /**
     * Search users
     * Route: GET: /users/searchs?query=
     * @param {Object} req request object
     * @param {Object} res response object
     */
  search(req, res) {
    const request = req.searchFilter;
    let condition = {};
    let pagination;
    request.attributes = [
      'id',
      'username',
      'firstname',
      'lastname',
      'email',
      'createdAt',
      'roleId',
    ];
    db.User.findAndCountAll(request)
     .then((users) => {
       condition = {
         count: users.count,
         limit: request.limit,
         offset: request.offset
       };
       delete users.count;
       pagination = Helpers.pagination(condition);
       let message;
       if (users.rows.length === 0) {
         message = 'User not Found';
       } else {
         message = 'Your search was successful';
       }
       res.status(200)
         .send({
           message,
           users,
           pagination
         });
     });
  },

  /**
   * fetchDetails - fetch a user details
   * @param  {Object} req request object
   * @param  {Object} res response object
   * @return {Object} returns an object
   */
  fetchDetails(req, res) {
    return db.User
    .find({
      where: {
        $or: [
          { email: req.params.identifier
          }, {
            username: req.params.identifier
          }
        ]
      }
    })
    .then((user) => {
      if (!user) {
        res.status(404)
        .send(
          {
            success: false,
            message: 'User does not exist'
          }
          );
      } else {
        return res.status(200)
          .send(
          { user
          });
      }
    })
    .catch((error) => {
      res.send(error);
    });
  },
  findAllUserDocument(req, res) {
    const request = req.searchFilter;
    let condition = {};
    let pagination;
    db.User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User Not Found'
        });
      }
      db.Document
      .findAndCountAll(request)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        condition = {
          count: document.count,
          limit: request.limit,
          offset: request.offset
        };
        delete document.count;
        pagination = Helpers.pagination(condition);
        return res.status(200)
        .send({
          document,
          pagination,
          message: 'Document was retrieved successfully'
        });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error occurred while retrieving documents'
      }));
    });
  },
};
export default User;
