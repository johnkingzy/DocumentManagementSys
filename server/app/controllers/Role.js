import db from './../models';

const Role = {
  create(req, res) {
    db.Role
    .create({
      title: req.body.title
    })
    .then(role =>
      res.status(200)
        .send({
          success: true,
          message: 'Role created succesfully',
          role
        }))
    .catch(() =>
      res.status(400)
        .send({
          success: false,
          message: 'Error creating new role'
        }));
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
          success: true,
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
    if (isNaN(req.params.id)) {
      return res.status(400).send({
        message: 'Error occured while updating role'
      });
    }
    db.Role
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
          .catch(() => res.status(400).send({
            message: 'Role did not update successfully.'
          }));
      })
      .catch(() => res.status(400).send({
        message: 'Error occured while updating role'
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
            message: 'This role has been deleted successfully'
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
    if (isNaN(req.params.id)) {
      return res.status(400).send({
        message: 'Error occured while retrieving role'
      });
    }
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
