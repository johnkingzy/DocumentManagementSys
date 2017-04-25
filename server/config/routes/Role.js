import express from 'express';
import Role from '../../app/controllers/Role';

const RoleRouter = express.Router();

RoleRouter.route('/')
    .post(Role.create);
export default RoleRouter;
