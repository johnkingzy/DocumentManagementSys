import express from 'express';
import logger from 'morgan';
import BodyParser from 'body-parser';

// import Users from './server/app/routes/users';
// import Document from './server/app/routes/Document';

const app = express();

app.use(logger('dev'));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
  extended: false
}));
// app.use('/users', Users);
// app.use('/Document', Document);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothigness.',
}));

export default app;
