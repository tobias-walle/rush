'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-trb:container', () => {
  const CONTAINER_NAME = 'hello-world';
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/container'))
      .withOptions({destination: '.', module: 'app'})
      .withArguments([CONTAINER_NAME]);
  });

  it('creates files', () => {
    assert.file([
      path.join(`${CONTAINER_NAME}.container.ts`)
    ]);
  });
});
