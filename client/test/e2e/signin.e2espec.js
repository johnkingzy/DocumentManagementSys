/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const config = require('../../../nightwatch.conf');
const faker = require('faker');

module.exports = {
  Signup: browser =>
    browser
      .url('http://localhost:4000/login')
      .waitForElementVisible('body')
      .assert.urlEquals('http://localhost:4000/login')
      .assert.title('DataHub')
      .setValue('input[id=firstname-signup]', 'solomon')
      .setValue('input[id=lastname-signup]', 'solomonjohn')
      .setValue('input[id=username-signup]', faker.name.findName())
      .setValue('input[id=password-signup]', 'maximuf123')
      .setValue('input[id=email-signup]', faker.internet.email())
      .setValue('input[id=confirm-signup]', 'maximuf123')
      .click('#signup-btn')
      .waitForElementVisible('#dashboard')
      .saveScreenshot('datahub-login.png')
      .end(),

  'Logout': function (browser) { //eslint-disable-line
    browser
      .url('http://localhost:4000/login')
      .waitForElementVisible('body')
      .click('#login')
      .waitForElementVisible('.modal')
      .setValue('input[id=username-login]', 'maximuf')
      .setValue('input[id=password-login]', 'maximuf123')
      .click('#login-btn')
       .click('button.waves-effect')
      .waitForElementVisible('#dashboard')
      .click('.logout')
      .waitForElementVisible('#authentication')
      .end();
  }
};
