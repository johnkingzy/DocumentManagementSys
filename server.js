import http from 'http';
import dotenv from 'dotenv';
import open from 'open';
import log from 'log-with-colors';
// import Model from './server/app/models';
import app from './server/config/app';

dotenv.load();
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
// Model.sequelize
//     .sync()
//     .then(() => {
//     });
server.listen(port, (error) => {
  if (!error) {
    log.success(`listening to app ${port}`);
    open(`http://localhost:${port}`);
  } else {
    log.error(error);
  }
});
export default app;
