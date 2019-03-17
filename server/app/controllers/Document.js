import db from '../models';
import Helpers from './helpers';


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
    const request = Helpers.createQueryForList(req);
    let condition = {};
    let pagination;
    db.Document
    .findAndCountAll(request)
    .then((document) => {
      condition = {
        count: document.count,
        limit: request.limit,
        offset: request.offset
      };
      delete document.count;
      pagination = Helpers.pagination(condition);
      return res.status(200)
      .send({
        document,
        pagination,
        message: 'Document was retrieved successfully'
      });
    })
    .catch(error => res.status(400).send({
      error,
      message: 'Error occurred while retrieving documents'
    }));
  },
  fetchOne(req, res) {
    res.status(200)
    .send(
      {
        success: true,
        document: req.document
      });
  },
  update(req, res) {
    req.document
    .update(req.body)
    .then((data) => {
      res.status(200)
      .send(
        {
          success: true,
          document: data,
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
  },
  /**
    * Search document
    * Route: GET: /searchs?query={}
    * @param {Object} req request object
    * @param {Object} res response object
    */
  search(req, res) {
    req.searchFilter.attributes = [
      'id',
      'title',
      'content',
      'access',
      'ownerId',
      'createdAt',
      'updatedAt'
    ];
    db.Document
      .findAndCountAll(req.searchFilter)
      .then((documents) => {
        const condition = {
          count: documents.count,
          limit: req.searchFilter.limit,
          offset: req.searchFilter.offset
        };
        delete documents.count;
        const pagination = Helpers.pagination(condition);
        let message;
        if (documents.rows.length === 0) {
          message = 'Document not Found';
        } else {
          message = 'Your search was successful';
        }
        res.status(200)
          .send({
            message,
            documents,
            pagination
          });
      });
  },
};

export default Document;
