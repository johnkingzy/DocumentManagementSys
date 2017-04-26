import jwt from 'jsonwebtoken';
import db from '../models/';
// import Helpers from './helpers';

const key = process.env.SECRET_KEY;
const User = {

  /**  Create a new user
   *   Route: POST: /users
   *  @param {object} req request object
   *  @param {object} res response object
   *  @return {void|Reponse} response object or void
   */
  create: (req, res) => {
    const token = jwt.sign(req.body, key, {
      expiresIn: 4000
    });
    db.User
      .create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        roleId: req.body.roleId
      })
      .then((user) => {
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

  /** Users login
   *  Route: POST: /users/login
   * @param {object} req request object
   * @param {object} res response object
   * @return {void|Response} response object or void
   */
  login: (req, res) => {
    db.User
    .findOne({
      where: { username: req.body.username }
    })
    .then((user) => {
      user
      .update(
        {
          active: true,
        }).then(() => {
          res.send('Logged In Successfully');
        });
    });
  },

  /**  Users logout
   * Route: POST: /users/logout
   *  @param {object} req request object
   * @param {object} res response object
   * @return {void} no return
   */
  logout: (req, res) => {
    db.User
    .findOne({
      where: {
        username: req.body.username
      }
    }).then((user) => {
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

  /**  Fetch All Users
   * Route: GET: /users/
   * @param {object} req request object
   * @param {object} res response object
   * @returns {void|Response} return response object or void
   */
  fetchAll: (req, res) => {
    db.User
    .findAll({})
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.send(error);
    });
  },

  /** Fetch One User based on params ID
   * Route: GET: /users/:id
   * @param {object} req request object
   * @param {object} res response object
   * @return {void|Response} return response object or void
   */
  fetchOne: (req, res) => {
    const UserId = req.params.id;
    db.User
    .findOne({
      where: { id: UserId }
    })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.send(`User with id:${UserId} does not exist`);
      }
    })
    .catch((error) => {
      res.send(error);
    });
  }
};
export default User;
