import db from './server/app/models';

db.sequelize.sync({ force: true })
    .then(() => {
      console.log('synced');
    })
    .catch(() => {
      console.log(error);
    });
