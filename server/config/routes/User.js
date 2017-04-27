import express from 'express';
import User from '../../app/controllers/User';
import Auth from '../middlewares/Authentication';

const UserRouter = express.Router();

UserRouter.route('/')
  .get(Auth.isLoggedIn, Auth.isAdmin, User.fetchAll)
  .post(Auth.ValidateInput, User.create);

UserRouter.route('/:id')
  .get(Auth.isLoggedIn, Auth.isAdmin, User.fetchOne)
  .put(Auth.isLoggedIn, Auth.validateUpdate, User.updateUserData);

UserRouter.route('/logout')
  .post(Auth.isLoggedIn, User.logout);

UserRouter.route('/login')
  .post(Auth.authenticate, User.login);

export default UserRouter;
