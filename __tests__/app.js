'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

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
      '.gitignore'
    ]);
  });

  it('should create yo-rc', () => {
    assert.file([
      '.yo-rc.json'
    ]);
  });
});
