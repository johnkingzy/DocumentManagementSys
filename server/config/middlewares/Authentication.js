import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../../app/models';

dotenv.config();
const key = process.env.SECRET_KEY;
const Authenticate = {
  UserInput: (req, res, next) => {
    if (req.body.roleId && req.body.roleId === 1) {
      return res.status(403)
        .send({
          message: 'Access denied, you can\'t sign up as admin'
        });
    }
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
    next();
  },
  LoggedIn: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, key, (error, decoded) => {
        if (!error) {
          req.decoded = decoded;
          next();
        } else {
          return res.json({
            success: false,
            message: 'Authentication not allowed'
          });
        }
      });
    } else {
      return res.status(403)
        .send({
          success: false,
          message: 'Access denied, Only registered users are allowed'
        });
    }
    // next();
  },
  isAuthenticated: (req, res, next) => {
    db.User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then((user) => {
        if (!user) {
          res.json({
            success: false,
            message: 'Authentication failed. User not found.'
          });
        } else if (user) {
          if (user.password !== req.body.password) {
            res.json({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          } else {
            const JwtOptions = {
              expiresIn: '1440m'
            };
            const token = jwt.sign({
              user
            }, key, JwtOptions);
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token
            });
            next();
          }
        }
      });
  },
  VerifyToken: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, key, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Failed to Authenticate Token'
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(404)
        .send({
          success: false,
          message: 'No Token Provided'
        });
    }
  }
};
export default Authenticate;
