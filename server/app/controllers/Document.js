import db from '../models';
import Helpers from './helpers';

const Document = {
  create(req, res) {
    db.Document
      .create(req.Document)
      .then((document) => {
        res.status(200)
          .send({
            document,
            message: 'Your document was created successfully'
          });
      })
      .catch(error => res.status(400).send(error));
  }
};
export default Document;
