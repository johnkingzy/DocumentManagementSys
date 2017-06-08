import http from 'http';
import dotenv from 'dotenv';
import log from 'log-with-colors';
import app from './server/config/app';

dotenv.load();
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, (error) => {
  if (!error) {
    log.success(`listening to app ${port}`);
    // open(`http://localhost:${port}`);
  } else {
    log.error(error);
  }
});
export default app;
