'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-trb:duck', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/duck'))
      .withOptions({destination: '.'})
      .withArguments(['hello-world', 'a b c']);
  });

  it('creates files', () => {
    assert.file([
      'hello-world.duck.ts'
    ]);
  });
});
