import express from 'express';
import document from '../../app/controllers/Document';
import Auth from '../middlewares/Authentication';

const DocumentRouter = express.Router();

DocumentRouter.route('/')
  .get(Auth.isLoggedIn, document.fetchAll)
  .post(Auth.isLoggedIn, Auth.validateDocument, document.create);

DocumentRouter.route('/:id')
  .get(Auth.isLoggedIn, Auth.checkAccess, document.fetchOne)
  .put(Auth.isLoggedIn, Auth.checkDocument, document.update)
  .delete(Auth.isLoggedIn, Auth.deleteDocument, document.delete);

DocumentRouter.route('/users/:id/alldocuments')
  .get(Auth.isLoggedIn, document.findAllUserDocument);


export default DocumentRouter;
