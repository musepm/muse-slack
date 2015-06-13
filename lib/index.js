'use strict';

var SlackClient = require('slack-client'),
    credentials = require('musepm-credentials');

module.exports = {
  signon: function signon(cfg) {
    var creds, slack;
    return regeneratorRuntime.async(function signon$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return credentials.getAll('slack');

        case 3:
          creds = context$1$0.sent;
          slack = new SlackClient(creds[cfg], true, true);
          context$1$0.next = 10;
          break;

        case 7:
          context$1$0.prev = 7;
          context$1$0.t0 = context$1$0['catch'](0);

          console.error(context$1$0.t0);

        case 10:
          slack.login();
          return context$1$0.abrupt('return', slack);

        case 12:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this, [[0, 7]]);
  }
};