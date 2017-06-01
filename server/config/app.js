import express from 'express';
import logger from 'morgan';
import webpack from 'webpack';
import path from 'path';
import webpackHotMidlleware from 'webpack-hot-middleware';
import webpackMiddleware from 'webpack-dev-middleware';
import validator from 'express-validator';
import BodyParser from 'body-parser';
import UserRouter from './routes/User';
import DocumentRouter from './routes/Document';
import RoleRouter from './routes/Role';
import webpackConfig from '../../webpack.config.dev';

const app = express(),
  compiler = webpack(webpackConfig);

app.use(express.static(path.join(__dirname, '../../')));

if (process.env.NODE_ENV !== 'test') {
  app.use(webpackMiddleware(compiler));

  app.use(webpackHotMidlleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: false
  }));
}

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
  extended: false
}));
app.use(validator());
app.use(validator({
  customValidators: {
    isUsername: (value) => {
      return value.length >= 5;
    }
  }
}));
app.use('/users', UserRouter);
app.use('/documents', DocumentRouter);
app.use('/roles', RoleRouter);
app.use(logger('dev'));

app.get('*', (req, res) => res.status(200)
.sendFile(path.join(__dirname, '../../client/index.html')));

export default app;
