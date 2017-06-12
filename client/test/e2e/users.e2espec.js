// const faker = require('faker');


module.exports = {
  'Edit Profile': browser =>
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
      .click('#edit-profile')
      .waitForElementVisible('#profile-edit')
      .clearValue('input#firstname')
      .setValue('input#firstname', 'MaximufJohn')
      .click('#update-account')
      .waitForElementVisible('tbody')
      .assert.containsText('#firstname', 'MaximufJohn')
      .end(),
  'Change Password': browser =>
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
      .click('#change-password')
      .waitForElementVisible('.passkey')
      .setValue('input#password', 'maximuf123')
      .setValue('input#confirm-password', 'maximuf123')
      .click('#submit-password')
      .waitForElementVisible('tbody')
      .end(),
};
