'use strict';

var assert = require('assert'),
    Slack = require('../index');

describe('Slack', function () {
  describe('#send', function () {

    it('should send a message', function (dn) {
      console.log('top');
      var chat = new Slack('testbot01');
      dn();
      return; /*
              await chat.ready();
              chat.send('general', 'Testing');*/
    });
  });
});