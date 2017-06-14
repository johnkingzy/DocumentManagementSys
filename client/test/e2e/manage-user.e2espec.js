const { url, timeout } = require('../setup');

module.exports = {
  'Change User Role': browser =>
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .waitForElementVisible('.modal', timeout)
      .setValue('input[id=username-login]', 'maximuf')
      .setValue('input[id=password-login]', 'maximuf123')
      .click('#login-btn')
      .click('button.waves-effect')
      .waitForElementVisible('#dashboard', timeout)
      .click('#admin-link')
      .waitForElementVisible('#admin-panel', timeout)
      .click('#admin-action')
      .waitForElementVisible('#side-panel', timeout)
      .click('#change-role')
      .waitForElementVisible('#roles', timeout)
      .setValue('input[type=radio]', 4)
      .click('#save-it')
      .end(),
  'Delete User': browser =>
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .waitForElementVisible('.modal', timeout)
      .setValue('input[id=username-login]', 'maximuf')
      .setValue('input[id=password-login]', 'maximuf123')
      .click('#login-btn')
      .click('button.waves-effect')
      .waitForElementVisible('#dashboard', timeout)
      .click('#admin-link')
      .waitForElementVisible('#admin-panel', timeout)
      .click('#admin-action')
      .waitForElementVisible('#side-panel', timeout)
      .click('#delete-user')
      .end(),
  'Search User': browser =>
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .waitForElementVisible('.modal', timeout)
      .setValue('input[id=username-login]', 'maximuf')
      .setValue('input[id=password-login]', 'maximuf123')
      .click('#login-btn')
      .click('button.waves-effect')
      .waitForElementVisible('#dashboard', timeout)
      .click('#admin-link')
      .waitForElementVisible('#admin-panel', timeout)
      .setValue('input#search-user', 'david')
      .keys(browser.Keys.ENTER)
      .waitForElementVisible('#searching', timeout)
      .assert.containsText('#firstname', 'adewale')
      .end(),
};
