module.exports = {
  'Change User Role': browser =>
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
      .click('#admin-link')
      .pause(5000)
      .waitForElementVisible('#admin-panel')
      .click('#admin-action')
      .waitForElementVisible('#side-panel')
      .click('#change-role')
      .waitForElementVisible('#roles')
      .setValue('input[type=radio]', 4)
      .click('#save-it')
      .end(),
  'Delete User': browser =>
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
      .click('#admin-link')
      .waitForElementVisible('#admin-panel')
      .click('#admin-action')
      .waitForElementVisible('#side-panel')
      .click('#delete-user')
      .end(),
  'Search User': browser =>
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
      .click('#admin-link')
      .waitForElementVisible('#admin-panel')
      .setValue('input#search-user', 'solom')
      .keys(browser.Keys.ENTER)
      .waitForElementVisible('#searching')
      .assert.containsText('#firstname', 'solomon')
      .end(),
};
