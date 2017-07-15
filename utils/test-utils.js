var assert = require('yeoman-assert');

function assertFileContains(pathName, content) {
  if (!content instanceof Array) {
    content = [content];
  }
  content.map((text) => {
    assert.fileContent(pathName, new RegExp(`^.*${text}.*$`, 'mg'));
  });
}

module.exports = {
  assertFileContains
};
