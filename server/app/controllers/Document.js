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
    const query = Helpers.createQueryForList(req);
    db.Document
     .findAndCountAll(query)
    .then((documents) => {
      const condition = {
        count: documents.count,
        limit: query.limit,
        offset: query.offset
      };
      delete documents.count;
      const pagination = Helper.pagination(condition);
      res.send(
        {
          success: true,
          documents,
          pagination
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
        res.status(200)
          .send({
            message: 'This search was successfull',
            documents,
            pagination
          });
      });
  },
  findAllUserDocument(req, res) {
    return db.Document
    .findAll({
      where: {
        $or: [
          { access: 'public' },
          {
            ownerRoleId: req.decoded.roleId
          },
          {
            ownerId: req.params.id
          }
        ]
      },
      include: [db.User],
      order: [['updatedAt', 'DESC']]
    })
    .then((document) => {
      if (!document) {
        return res.status(404).send({
          message: 'Document Not Found',
        });
      }
      return res.status(200).send(document);
    })
    .catch(error => res.status(400).send({
      error,
      message: 'Error occurred while retrieving documents'
    }));
  },
};

export default Document;
