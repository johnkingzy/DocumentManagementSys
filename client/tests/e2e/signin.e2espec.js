/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const config = require('../../../nightwatch.conf');

module.exports = {
  'DataHub': function (browser) { //eslint-disable-line
    browser
      .url('http://localhost:4000')
      .waitForElementVisible('body')
    //   .click('#email-login')
      .assert.urlEquals('http://localhost:4000/login')
      .assert.title('DataHub')
      .saveScreenshot('datahub-login.png')
      .end();
  }
};
