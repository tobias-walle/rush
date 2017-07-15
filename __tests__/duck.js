'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const utils = require('../utils/general-utils');
const testUtils = require('../utils/test-utils');

describe('generator-trb:duck', () => {
  const DUCK_NAME = 'hello-world';
  const DUCK_PATH = `${DUCK_NAME}.duck.ts`;
  const SPEC_PATH = `${DUCK_NAME}.duck.ts`;
  const STATE_NAME = 'HelloWorldState';
  const REDUCER_NAME = 'helloWorldReducer';
  const EPIC_NAME = 'helloWorldEpic';

  const ACTION_TYPES = [
    `app/hello-world/A`,
    `app/hello-world/B`,
    `app/hello-world/C`,
  ]


  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/duck'))
      .withOptions({destination: '.'})
      .withArguments([DUCK_NAME, 'a b c']);
  });

  it('creates files', () => {
    assert.file([
      DUCK_PATH,
      SPEC_PATH
    ]);
  });

  it('should create file content', () => {
    testUtils.assertFileContains(
      DUCK_PATH, [
        STATE_NAME,
        REDUCER_NAME,
        EPIC_NAME,
        ...ACTION_TYPES
      ]
    )
  });
});
