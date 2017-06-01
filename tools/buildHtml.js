/* eslint no-unused-vars: "off" */
import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/* eslint no-console: "off" */

fs.readFile('client/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  $('head').prepend('<link rel="stylesheet" href="style.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});
