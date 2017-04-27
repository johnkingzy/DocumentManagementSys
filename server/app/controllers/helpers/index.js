import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../../app/models';

dotenv.config();
const key = process.env.SECRET_KEY;
const Helpers = {

  /**
   * isOwner - checks if a user owns an account
   * @param  {object} req request object
   * @return {boolean} either true or false
   */
  isOwner(req) {
    const currentUser = req.decoded.user.id;
    const userId = req.params.id;
    return String(currentUser) === String(userId);
  },

  /**
   * isAdmin - checks if a user is an admin user
   * @param  {integer} roleId User's roleId
   * @return {boolean} either true or false
   */
  isAdmin(roleId) {
    return roleId === 1;
  },

  /**
   * isRegular - checks if a User is a regular user
   * @param  {integer} roleId User's roleId
   * @return {boolean} either true or false
   */
  isRegular(roleId) {
    return roleId === 2;
  },

  /**
   * createToken - create a new token for the user
   * @param  {object} user containing the user's data
   * @return {String} token JWT token generated
   */
  createToken(user) {
    const token = jwt.sign({
      user
    },
      key, {
        expiresIn: 4000
      });
    return token;
  }
};
export default Helpers;
