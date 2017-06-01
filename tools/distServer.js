
import path from 'path';
import compression from 'compression';
import express from 'express';

import app from '../server/config/app'; // express server

/* eslint-disable no-console */

const port = parseInt(process.env.PORT, 10) || 4000;

app.use(compression());
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
});
