'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const utils = require('../utils/general-utils');

describe('generator-trb:duck', () => {
  const DUCK_NAME = 'hello-world';

  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/duck'))
      .withOptions({destination: '.'})
      .withArguments([DUCK_NAME, 'a b c']);
  });

  it('creates files', () => {
    assert.file([
      `${DUCK_NAME}.duck.ts`
    ]);

    assert.fileContent(
      `${DUCK_NAME}.duck.ts`,
      new RegExp(`.*${utils.fromLispToUpperCamelCase(DUCK_NAME)}.*`, 'gm')
    );
  });
});
