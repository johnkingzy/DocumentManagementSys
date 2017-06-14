const { url, timeout } = require('../setup');

module.exports = {
  'Edit Profile': browser =>
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
      .click('#edit-profile')
      .waitForElementVisible('#profile-edit', timeout)
      .clearValue('input#firstname')
      .setValue('input#firstname', 'MaximufJohn')
      .click('#update-account')
      .waitForElementVisible('tbody', timeout)
      .assert.containsText('#firstname', 'MaximufJohn')
      .end(),
  'Change Password': browser =>
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
      .click('#change-password')
      .waitForElementVisible('.passkey', timeout)
      .setValue('input#password', 'maximuf123')
      .setValue('input#confirm-password', 'maximuf123')
      .click('#submit-password')
      .waitForElementVisible('tbody', timeout)
      .end(),
};
