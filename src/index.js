var muse = require('musepm'),
    sinon = require('sinon');

module.exports = {
  make(cfg) {
    var Real = require('./real');
    if (muse.mocking) {
      Real.prototype.constructor = f => {};
      var obj = new Real(cfg);
      return sinon.stub(obj);
    } else {
      return new Real(cfg);
    }
  }
}

