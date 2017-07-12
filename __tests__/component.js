'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const utils = require('../utils/general-utils');

describe('generator-trb:component', () => {
  const COMPONENT_NAME = 'hello-world';

  it('creates files', () => {
    return helpers.run(path.join(__dirname, '../generators/component'))
      .withOptions({destination: '.'})
      .withArguments([COMPONENT_NAME])
      .then(() => {
        assert.file([
          COMPONENT_NAME,
          path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.scss`),
          path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.tsx`),
          path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.spec.tsx`),
        ]);

        assert.fileContent([
          [
            path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.tsx`),
            new RegExp(`.*${utils.fromLispToUpperCamelCase(COMPONENT_NAME)}Component.*`)
          ],
          [
            path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.spec.tsx`),
            new RegExp(`.*${utils.fromLispToUpperCamelCase(COMPONENT_NAME)}Component.*`)
          ]
        ]);
        return Promise.resolve();
      });
  });

  it('creates files flat', () => {
    helpers.run(path.join(__dirname, '../generators/component'))
      .withOptions({destination: '.'})
      .withArguments([COMPONENT_NAME])
      .withOptions({flat: true})
      .then(() => {
        assert.file([
          COMPONENT_NAME,
          path.join(`${COMPONENT_NAME}.component.scss`),
          path.join(`${COMPONENT_NAME}.component.tsx`),
          path.join(`${COMPONENT_NAME}.component.spec.tsx`),
        ]);
        return Promise.resolve();
      });
  });
})
;
