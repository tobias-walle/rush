'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const utils = require('../utils/general-utils');

describe('generator-trb:app', () => {
  const PROJECT_NAME = 'my-project';
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: PROJECT_NAME});
  });

  it('should create files', () => {
    // Check some files
    assert.file([
      'package.json',
      'src',
      'webpack',
      '.gitignore',
      'README.md'
    ]);
  });

  it('should create yo-rc', () => {
    assert.file([
      '.yo-rc.json'
    ]);
  });

  it('should modify the package.json', () => {
    assert.fileContent(
      'package.json',
      new RegExp(`^.*${PROJECT_NAME}.*$`, 'mg')
    );
  });

  it('should generate a README', () => {
    assert.fileContent(
      'README.md',
      new RegExp(`^.*${utils.fromLispToFirstLetterUppercaseWords(PROJECT_NAME)}.*$`, 'mg')
    );
  });
});
