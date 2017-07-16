'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-trb:module', () => {
  const GENERATOR_PATH = path.join(__dirname, '../generators/module');

  const MODULE_NAME = 'hello-world';
  const MODULE_PATH = path.join('src', 'app', 'modules', MODULE_NAME);
  const COMPONENT_PATH = path.join(MODULE_PATH, `${MODULE_NAME}.component.tsx`);
  const COMPONENT_SPEC_PATH = path.join(MODULE_PATH, `${MODULE_NAME}.component.spec.tsx`);
  const COMPONENT_STYLES_PATH = path.join(MODULE_PATH, `${MODULE_NAME}.component.scss`);
  const DUCK_PATH = path.join(MODULE_PATH, `${MODULE_NAME}.duck.ts`);

  it('should create files', async () => {
    await helpers.run(GENERATOR_PATH).withArguments([MODULE_NAME]);
    assert.file([
      MODULE_PATH,
      COMPONENT_PATH,
      COMPONENT_SPEC_PATH,
      DUCK_PATH,
    ]);
  });

  it('should skip component generation if option is set', async () => {
    await helpers.run(GENERATOR_PATH)
    .withArguments([MODULE_NAME])
    .withOptions({
      'component': false,
    });

    assert.file([
      MODULE_PATH,
      DUCK_PATH
    ]);
    assert.noFile([
      COMPONENT_PATH,
      COMPONENT_SPEC_PATH,
      COMPONENT_STYLES_PATH,
    ]);
  });

  it('should skip duck generation if option is set', async () => {
    await helpers.run(GENERATOR_PATH)
    .withArguments([MODULE_NAME])
    .withOptions({
      'duck': false,
    });

    assert.file([
      MODULE_PATH,
      COMPONENT_PATH,
      COMPONENT_SPEC_PATH,
    ]);
    assert.noFile([
      DUCK_PATH,
      COMPONENT_STYLES_PATH,
    ]);
  });
});
