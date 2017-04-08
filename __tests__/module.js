'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-trb:module', () => {
  const MODULE_NAME = 'hello-world';

  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/module'))
      .withArguments([MODULE_NAME]);
  });

  it('creates files', () => {
    assert.file([
      path.join('src', 'app', 'modules', MODULE_NAME),
      path.join('src', 'app', 'modules', MODULE_NAME, `${MODULE_NAME}.component.tsx`),
      path.join('src', 'app', 'modules', MODULE_NAME, `${MODULE_NAME}.component.spec.tsx`),
      path.join('src', 'app', 'modules', MODULE_NAME, `${MODULE_NAME}.component.scss`)
    ]);
  });

  it('renders redux file', () => {
    assert.fileContent(
      path.join('src', 'app', 'modules', MODULE_NAME, `${MODULE_NAME}.redux.ts`),
      /.*HelloWorldState.*/gm
    );
  });
});
