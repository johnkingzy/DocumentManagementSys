import express from 'express';
import User from '../../app/controllers/User';
import Auth from '../middlewares/Authentication';

const UserRouter = express.Router();

UserRouter.route('/')
  .get(Auth.isLoggedIn, Auth.isAdmin, User.fetchAll)
  .post(Auth.ValidateInput, User.create);

UserRouter.route('/:id')
  .get(Auth.isLoggedIn, Auth.isAdmin, User.fetchOne);

UserRouter.route('/logout')
  .post(User.logout);

UserRouter.route('/login')
  .post(Auth.authenticate, User.login);

export default UserRouter;
