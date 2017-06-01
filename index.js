import log from 'log-with-colors';
import models from './server/app/models';

models.sequelize
  .authenticate()
  .then(() => {
    log.success('Connection successful');
  })
  .catch((error) => {
    log.error('Error while trying to connect!!! Maximuf', error);
  });
