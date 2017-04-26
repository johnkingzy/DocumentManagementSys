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
    res.status(200)
      .send({
        message: 'Login Successfully'
      });
  },

  /**  Users logout
   * Route: POST: /users/logout
   *  @param {object} req request object
   * @param {object} res response object
   * @return {void} no return
   */
  logout: (req, res) => {
    db.User.findOne({
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
  }
};
export default User;
