// import jwt from 'jsonwebtoken';
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
        res.status(200)
          .send({
            user,
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
          res.status(200)
          .json({
            success: true,
            message: 'Logged In Successfully',
            token
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
          res.send('Logged Out Successfully');
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
   * @returns {void|Response} return response object or void
   */
  fetchAll(req, res) {
    let query;
    if (req.query.limit && req.query.offset) {
      if (isNaN(req.query.limit) || isNaN(req.query.offset)) {
        return res.status(403)
        .send(
          {
            success: false,
            message: 'limit and offset should be integers'
          }
        );
      }
      query = {
        offset: parseInt(req.query.offset, 10),
        limit: parseInt(req.query.limit, 10)
      };
    } else {
      query = {};
    }
    db.User
    .findAll(query)
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.send(error);
    });
  },

  /** fetchOne - Fetches One User based on params ID
   * Route: GET: /users/:id
   * @param {object} req request object
   * @param {object} res response object
   */
  fetchOne(req, res) {
    const UserId = req.params.id;
    db.User
    .findOne({
      where: { id: UserId }
    })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.send(
          {
            success: false,
            message: `User with id:${UserId} does not exist`
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
        .then(() => {
          res.send({
            success: true,
            message: 'Profile Info Updated Successfully'
          });
        })
        .catch((error) => {
          res.send(error);
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
     * @returns {void|Response} response object or void
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
       res.status(200)
         .send({
           message: 'Your search was successful',
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
        res.send(
          {
            success: false,
            message: 'User does not exist'
          }
          );
      } else {
        return res
          .status(200)
          .send({ user });
      }
    })
    .catch((error) => {
      res.send(error);
    });
  }
};
export default User;
