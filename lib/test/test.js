'use strict';

var assert = require('assert'),
    muse = require('musepm'),
    slack = require('../index');

describe('Slack', function () {
  describe('#send', function () {

    it('should send a message', function (dn) {
      var chat = slack.make('testbot03');
      chat.on('ready', function (f) {
        chat.send('general', 'Testing 4545');
        dn();
      });
    });
  });
});