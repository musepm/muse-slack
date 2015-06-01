var muse = require('musepm');

if (muse.mocking) {
  module.exports = require('./mock');
} else {
  module.exports = require('./real');
}

