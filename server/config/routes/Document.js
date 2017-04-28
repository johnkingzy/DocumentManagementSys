import express from 'express';
import document from '../../app/controllers/Document';
import Auth from '../middlewares/Authentication';

const DocumentRouter = express.Router();

DocumentRouter.route('/')
  // .get(Auth.isLoggedIn, Auth.isAdmin, User.fetchAll)
  .post(Auth.isLoggedIn, Auth.validateDocument, document.create);

// DocumentRouter.route('/:id')
//   .get(Auth.isLoggedIn, Auth.isAdmin, User.fetchOne)
//   .put(Auth.isLoggedIn, Auth.validateUpdate, User.updateUserData)
//   .delete(Auth.isLoggedIn, Auth.isAdmin, Auth.validateDelete, User.deleteUser);


export default DocumentRouter;
