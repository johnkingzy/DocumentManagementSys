import models from './server/app/models';

models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection successful');
  })
  .catch((error) => {
    console.log('Error while trying to connect!!! Maximuf', error);
  });
