import http from 'http';
import dotenv from 'dotenv';
import Model from './server/app/models';
import app from './server/config/app';

dotenv.load();
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
Model.sequelize
    .sync()
    .then(() => {
      server.listen(port, () => {
        console.log(`listening to app ${port}`);
      });
    });
export default app;
