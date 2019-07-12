const fs = require('fs');
const path = require('path');
const root = fs.realpathSync(process.cwd());

module.exports = function resolve(src) {
  return path.resolve(root, src);
};