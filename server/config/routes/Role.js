import express from 'express';
import Role from '../../app/controllers/Role';
import Auth from '../middlewares/Authentication';

const RoleRouter = express.Router();

RoleRouter.route('/')
    .post(Auth.isLoggedIn, Auth.checkAdmin, Role.create)
    .get(Auth.isLoggedIn, Auth.checkAdmin, Role.getAll);
RoleRouter.route('/:id')
    .put(Auth.isLoggedIn, Auth.checkAdmin,
      Auth.checkRolePermission,
      Role.update)
    .delete(Auth.isLoggedIn, Auth.checkAdmin,
      Auth.checkRolePermission, Role.delete)
    .get(Auth.isLoggedIn, Auth.checkAdmin, Role.getRole);
export default RoleRouter;
