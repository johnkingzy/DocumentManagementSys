import express from 'express';
import Role from '../../app/controllers/Role';
import Auth from '../middlewares/Authentication';

const RoleRouter = express.Router();

RoleRouter.route('/')
    .post(Auth.isLoggedIn, Auth.checkAdmin, Role.create)
    .get(Auth.isLoggedIn, Auth.checkAdmin, Role.getAll);
export default RoleRouter;
