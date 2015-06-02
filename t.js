var sinon = require('sinon');

class T {
  constructor(n) {
    this.n = n;
    console.log('t start');
  }

  a() {
    console,log('a');
    this.b()
  }

  b() {
    console.log('b');
  }
}

T.prototype.constructor = conf => {
}

var x = new T('j');

var obj = sinon.mock(x);
obj.expects('b').once();

x.b();

obj.verify();
