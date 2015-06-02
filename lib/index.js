'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var muse = require('musepm'),
    SlackClient = require('node-slack-client'),
    credentials = require('musepm-credentials');

module.exports = {
  signon: function signon(cfg) {
    var creds, slack;
    return _regeneratorRuntime.async(function signon$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.next = 2;
          return credentials.getAll();

        case 2:
          creds = context$1$0.sent;
          slack = new SlackClient(creds[cfg], true, true);
          return context$1$0.abrupt('return', slack);

        case 5:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this);
  }
};