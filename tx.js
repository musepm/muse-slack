'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var sinon = require('sinon');

var T = (function () {
  function T(n) {
    _classCallCheck(this, T);

    this.n = n;
    console.log('t start');
  }

  _createClass(T, [{
    key: 'a',
    value: function a() {
      console, log('a');
      this.b();
    }
  }, {
    key: 'b',
    value: function b() {
      console.log('b');
    }
  }]);

  return T;
})();

T.prototype.constructor = function (conf) {};

var x = new T('j');

var obj = sinon.mock(x);
obj.expects('b').once();

x.b();

obj.verify();

