import db from './../models';

const Role = {
  create(req, res) {
    db.Role
    .create({
      title: req.body.title
    })
    .then(role =>
      res.status(200)
        .send(role))
    .catch(error =>
      res.status(400)
        .send(error));
  },
  /**
    * Get all roles
    * Route: GET: /roles/
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  getAll(req, res) {
    db.Role
      .findAll()
      .then((roles) => {
        res.status(200)
        .send({
          message: 'All roles was retrieved successfully',
          roles
        });
      });
  },

  /**
    * Update roles
    * Route: PUT: /roles/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  update(req, res) {
    return Roles
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return role
          .update({
            title: req.body.title || role.title,
          })
          .then(() => res.status(200).send({
            role,
            message: 'Role updated successfully.'
          }))
          .catch(error => res.status(400).send({
            error,
            message: 'Role did not update successfully.'
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error updating role'
      }));
  },

  /**
    * Delete a Role
    * Route: DELETE: /roles/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  delete(req, res) {
    req.roleInstance.destroy()
      .then(() => {
        res.status(200)
          .send({
            message: 'This role has been deleted'
          });
      });
  },

  /**
    * Get role by id
    * Route: GET: /roles/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  getRole(req, res) {
    db.Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404)
            .send({
              message: 'This role does not exist'
            });
        }
        res.status(200)
         .send({
           message: 'This role has been retrieved successfully',
           role
         });
      });
  }
};

export default Role;
