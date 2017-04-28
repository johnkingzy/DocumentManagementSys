import express from 'express';
import logger from 'morgan';
import validator from 'express-validator';
import BodyParser from 'body-parser';
import UserRouter from './routes/User';
import DocumentRouter from './routes/Document';
import RoleRouter from './routes/Role';

// import Users from './server/app/routes/users';
// import Document from './server/app/routes/Document';

const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
  extended: false
}));
app.use(validator());
app.use('/users', UserRouter);
app.use('/documents', DocumentRouter);
app.use('/roles', RoleRouter);
app.use(logger('dev'));

// app.use('/users', Users);
// app.use('/Document', Document);

// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to the beginning of nothigness.',
// }));

export default app;
