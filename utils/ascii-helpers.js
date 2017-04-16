const fs = require('fs');
const path = require('path');

module.exports = {
  getLogo() {
    return fs.readFileSync(path.join(__dirname, 'assets', 'logo.txt'), 'utf-8');
  }
};
