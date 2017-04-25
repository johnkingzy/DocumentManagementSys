import express from 'express';
import User from '../../app/controllers/User';
import Auth from '../middlewares/Authentication';

const UserRouter = express.Router();

UserRouter.route('/', Auth.UserInput)
  .post(User.create);
UserRouter.route('/login')
  .post(Auth.isAuthenticated, User.login);
UserRouter.use(Auth.VerifyToken);

export default UserRouter;
