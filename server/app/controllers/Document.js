import db from '../models';
// import Helpers from './helpers';


const Document = {
  create(req, res) {
    db.Document
      .create(req.Document)
      .then((document) => {
        res.status(200)
          .send({
            success: true,
            document,
            message: 'Your document was created successfully'
          });
      })
      .catch(error => res.status(400).send(error.errors));
  },
  fetchAll(req, res) {
    let query;
    if (req.query.limit && req.query.offset) {
      if (isNaN(req.query.limit) || isNaN(req.query.offset)) {
        return res.status(403)
        .send(
          {
            success: false,
            message: 'limit and offset should be integers'
          }
        );
      }
      query = {
        offset: parseInt(req.query.offset, 10),
        limit: parseInt(req.query.limit, 10)
      };
    } else {
      query = {};
    }
    db.Document
    .findAll(query)
    .then((document) => {
      res.send(
        {
          success: true,
          document
        });
    })
    .catch((error) => {
      res.send(error);
    });
  },
  fetchOne(req, res) {
    res.status(200)
    .send(
      {
        success: true,
        message: req.document
      });
  },
  update(req, res) {
    req.document
    .update(req.body)
    .then(() => {
      res.status(200)
      .send(
        {
          success: true,
          message: 'Document updated successfully'
        }
      );
    });
  },
  delete(req, res) {
    req.Document
    .destroy(
      {
        where: {
          id: req.Document.id
        }
      })
    .then(() => res.status(200)
      .send(
      {
        success: true,
        message: 'Document was deleted successfully'
      }
      ));
  }
};

export default Document;
