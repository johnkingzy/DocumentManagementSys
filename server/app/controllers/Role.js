import db from './../models';

const Role = {
  create: (req, res) =>
    db.Role
    .create({
      title: req.body.title
    })
    .then(role =>
      res.status(200)
        .send(role))
    .catch(error =>
      res.status(400)
        .send(error))
};
export default Role;
