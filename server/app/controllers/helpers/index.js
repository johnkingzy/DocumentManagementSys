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
   * roleAccess - check the role of the user
   * @param  {object} document document data
   * @return {BOOLEAN} returns true
   */
  roleAccess(document) {
    return document.access === 'role';
  },

  /**
   * publicAccess - checks if a document has a public access
   * @param  {object} document the documents data
   * @return {BOOLEAN} returns true
   */
  publicAccess(document) {
    return document.access === 'public';
  },
  /**
   * Query for search terms
   * @param {Array} terms array of search terms
   * @returns {Object} return user's data
   */
  likeSearch(terms) {
    const like = {
      $or:
      [
        { title: { $iLike: { $any: terms } } },
        { content: { $iLike: { $any: terms } } }
      ]
    };
    return like;
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
  },

  createQueryForList(req) {
    const limit = req.query.limit;
    const offset = req.query.offset || 0;
    const query = {};
    query.limit = limit;
    query.offset = offset;
    query.order = 'id DESC';
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
    const hasDecodedProperty =
    Object.prototype.hasOwnProperty.call(req, 'decoded');
    if (hasDecodedProperty) {
      const roleId = req.decoded.user.roleId;
      if (roleId === 1) {
        query.where = {};
      } else {
        query.where = this.documentAccess(req);
      }
    } else {
      query.where = {
        access: 'public',
      };
    }
    return query;
  },
  documentAccess(req) {
    const roleId = req.decoded.user.roleId;
    const userRoleId = roleId.toString();
    const access = {
      $or:
      [
        { access: 'public' },
        { ownerId: req.decoded.user.id },
        {
          $and: [
            { access: 'role' },
            { ownerRoleId: userRoleId }
          ]
        }
      ]
    };
    return access;
  },
  /**
   * Pagination
   * @param {Object} condition pagination condition
   * @returns {Object} return an object
   */
  pagination(condition) {
    const next = Math.ceil(condition.count / condition.limit);
    const currentPage = Math.floor((condition.offset / condition.limit) + 1);
    const pageSize = condition.limit > condition.count
      ? condition.count : condition.limit;
    return {
      page_count: next,
      page: currentPage,
      page_size: Number(pageSize),
      total_count: condition.count
    };
  },
  /**
   * getErrors - gets all errors
   * @param  {Array} errors an array of errors
   * @return {Object} returns object with errors
   */
  getErrors(errors) {
    const allErrors = [];
    errors.forEach((error) => {
      const errorMessage = error.msg;
      allErrors.push(errorMessage);
    });
    return allErrors;
  }
};
export default Helpers;
