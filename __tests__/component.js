'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const utils = require('../utils/general-utils');

describe('generator-trb:component', () => {
  const COMPONENT_NAME = 'hello-world';

  it('creates files', async() => {
    await helpers.run(path.join(__dirname, '../generators/component'))
      .withOptions({
        destination: '.'
      })
      .withArguments([COMPONENT_NAME]);

    const COMPONENT_FILE_NAME = path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.tsx`);
    const COMPONENT_SPEC_FILE_NAME = path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.spec.tsx`);
    const COMPONENT_STYLES_FILE_NAME = path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.tsx`);
    assert.file([
      COMPONENT_FILE_NAME,
      COMPONENT_SPEC_FILE_NAME,
      COMPONENT_STYLES_FILE_NAME
    ]);

    assert.fileContent([
      [COMPONENT_FILE_NAME, new RegExp(`.*${utils.fromLispToUpperCamelCase(COMPONENT_NAME)}Component.*`)],
      [COMPONENT_FILE_NAME, new RegExp(`.*${utils.fromLispToUpperCamelCase(COMPONENT_NAME)}ComponentState.*`)],
      [COMPONENT_FILE_NAME, new RegExp(`.*${utils.fromLispToUpperCamelCase(COMPONENT_NAME)}ComponentProps.*`)],
      [COMPONENT_SPEC_FILE_NAME, new RegExp(`.*${utils.fromLispToUpperCamelCase(COMPONENT_NAME)}Component.*`)]
    ]);
  });

  it('creates files flat', async() => {
    await helpers.run(path.join(__dirname, '../generators/component'))
      .withOptions({
        destination: '.'
      })
      .withArguments([COMPONENT_NAME])
      .withOptions({
        flat: true
      });
    assert.file([
      path.join(`${COMPONENT_NAME}.component.scss`),
      path.join(`${COMPONENT_NAME}.component.tsx`),
      path.join(`${COMPONENT_NAME}.component.spec.tsx`)
    ]);
  });
});
