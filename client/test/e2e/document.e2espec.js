const faker = require('faker');

const newTitle = faker.lorem.words(2);

module.exports = {
  'Create document': browser =>
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
      .click('#create-document')
      .waitForElementVisible('#createDocument')
      .waitForElementVisible('.mce-i-code')
      .setValue('input[name=title]', newTitle)
      .click('.mce-tinymce')
      .click('select option[value="public"]')
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraphs())
      .click('.mce-floatpanel .mce-container-body button')
      .waitForElementVisible('button.waves-effect')
      .click('button[type=submit]')
      .click('button.waves-effect')
      .waitForElementVisible('#dashboard')
      .assert.containsText('.email-title', '')
      .end(),

  'Open document': browser =>
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
      .click('.email-title')
      .waitForElementVisible('.email-content')
      .assert.containsText('.email-subject', 'editedTitle')
      .end(),

  'Search for a document': browser =>
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
      .waitForElementVisible('input#search')
      .setValue('input#search', 'Today')
      .keys(browser.Keys.ENTER)
      .waitForElementVisible('#email-list')
      .click('.email-title')
      .waitForElementVisible('.email-content')
      .assert.containsText('#document-title', 'Today')
      .end(),
  //
  'Edit document': (browser) => {
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
        .click('.email-title')
        .waitForElementVisible('#email-details')
        .click('.edit')
        .waitForElementVisible('.email-content')
        .clearValue('input#title')
        .setValue('input#title', 'editedTitle')
        .click('button.waves-effect')
        .waitForElementVisible('#email-list')
        .assert.containsText('.email-subject', 'editedTitle');
    browser.end();
  },
  //
  'Delete document': (browser) => {
    browser
      .url('http://localhost:4000/login')
      .waitForElementVisible('body')
      .click('#login')
      .waitForElementVisible('.modal')
      .setValue('input[id=username-login]', 'maximuf')
      .setValue('input[id=password-login]', 'maximuf123')
      .click('#login-btn')
      .waitForElementVisible('#dashboard')
      .click('select option[value="private"]')
      .waitForElementVisible('.email-title')
      .click('.email-title')
      .waitForElementVisible('#email-details')
      .click('.delete')
      .waitForElementVisible('.sweet-alert')
      .click('.confirm');
    browser.end();
  }
};
