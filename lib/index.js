'use strict';

var muse = require('musepm'),
    sinon = require('sinon');

module.exports = {
  make: function make(cfg) {
    var Real = require('./real');
    if (muse.mocking) {
      Real.prototype.constructor = function (f) {};
      var obj = new Real(cfg);
      return sinon.stub(obj);
    } else {
      return new Real(cfg);
    }
  }
};