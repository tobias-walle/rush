'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-trb:component', () => {
  const COMPONENT_NAME = 'hello-world';
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/component'))
      .withArguments([COMPONENT_NAME]);
  });

  it('creates files', () => {
    assert.file([
      COMPONENT_NAME,
      path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.tsx`),
      path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.spec.tsx`),
      path.join(COMPONENT_NAME, `${COMPONENT_NAME}.component.scss`)
    ]);
  });
});
