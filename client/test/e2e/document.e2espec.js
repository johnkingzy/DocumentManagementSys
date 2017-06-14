const faker = require('faker');
const { url, timeout } = require('../setup.js');

const newTitle = faker.lorem.words(2);

module.exports = {
  'Create document': (browser) => {
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
      .click('#create-document')
      .waitForElementVisible('#createDocument', timeout)
      .waitForElementVisible('.mce-i-code', timeout)
      .setValue('input[name=title]', newTitle)
      .click('.mce-tinymce')
      .click('select option[value="public"]')
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraphs())
      .click('.mce-floatpanel .mce-container-body button')
      .waitForElementVisible('button.waves-effect', timeout)
      .click('button[type=submit]')
      .click('button.waves-effect')
      .waitForElementVisible('#dashboard', timeout)
      .assert.containsText('.email-title', '')
      .end();
  },

  'Open document': (browser) => {
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .waitForElementVisible('.modal', timeout)
      .setValue('input[id=username-login]', 'maximuf')
      .setValue('input[id=password-login]', 'maximuf123')
      .click('#login-btn')
       .click('button.waves-effect')
      .waitForElementVisible('#dashboard', 5000)
      .click('.email-title')
      .waitForElementVisible('.email-content', timeout)
      .assert.containsText('.email-subject', 'public')
      .end();
  },

  'Search for a document': browser =>
    browser
      .url(url)
      .waitForElementVisible('body')
      .click('#login')
      .waitForElementVisible('.modal', timeout)
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

  'Edit document': (browser) => {
    browser
        .url(url)
        .waitForElementVisible('body', timeout)
        .click('#login')
        .waitForElementVisible('.modal')
        .setValue('input[id=username-login]', 'maximuf')
        .setValue('input[id=password-login]', 'maximuf123')
        .click('#login-btn')
        .click('button.waves-effect')
        .waitForElementVisible('#dashboard', timeout)
        .click('.email-title')
        .waitForElementVisible('#email-details', timeout)
        .click('.edit')
        .waitForElementVisible('.email-content', timeout)
        .clearValue('input#title')
        .setValue('input#title', 'editedTitle')
        .click('button.waves-effect')
        .waitForElementVisible('#email-list', timeout)
        .assert.containsText('.email-subject', 'editedTitle');
    browser.end();
  },

  'Delete document': (browser) => {
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .click('#login')
      .waitForElementVisible('.modal', timeout)
      .setValue('input[id=username-login]', 'maximuf')
      .setValue('input[id=password-login]', 'maximuf123')
      .click('#login-btn')
      .waitForElementVisible('#dashboard', timeout)
      .click('select option[value="private"]')
      .waitForElementVisible('.email-title', timeout)
      .click('.email-title')
      .waitForElementVisible('#email-details', timeout)
      .click('.delete')
      .waitForElementVisible('.sweet-alert', timeout)
      .click('.confirm');
    browser.end();
  }
};
