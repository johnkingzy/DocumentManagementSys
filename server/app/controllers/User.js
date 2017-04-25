import jwt from 'jsonwebtoken';
import db from '../models/';
// import Helpers from './helpers';

const key = process.env.SECRET_KEY;
const User = {
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
  login: (req, res) => {
    res.status(200)
      .send({
        message: 'Login Successfully'
      });
  }
};
export default User;
