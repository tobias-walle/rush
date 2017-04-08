'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-trb:component', () => {
  const COMPONENT_NAME = 'hello-world';

  it('creates files', () => {
    return helpers.run(path.join(__dirname, '../generators/component'))
      .withOptions({destination: '.'})
      .withArguments([COMPONENT_NAME])
      .then(() => {
        assert.file([
          COMPONENT_NAME,
          path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.tsx`),
          path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.spec.tsx`),
          path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.scss`)
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
          path.join(`${COMPONENT_NAME}.component.tsx`),
          path.join(`${COMPONENT_NAME}.component.spec.tsx`),
          path.join(`${COMPONENT_NAME}.component.scss`)
        ]);
        return Promise.resolve();
      });
  });
})
;
