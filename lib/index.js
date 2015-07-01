'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var SlackClient = require('slack-client'),
    credentials = require('musepm-credentials'),
    Channel = require('slack-client/src/channel');

module.exports = {
  signon: function signon(cfg) {
    var monitor, cls, creds, slack;
    return _regeneratorRuntime.async(function signon$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          monitor = require('musepm-monitor')(cfg);
          cls = Channel.prototype;

          cls.send = monitor.logCalls('slack', 'send', cls.send);
          context$1$0.next = 6;
          return _regeneratorRuntime.awrap(credentials.getAll('slack'));

        case 6:
          creds = context$1$0.sent;
          slack = new SlackClient(creds[cfg], true, true);
          context$1$0.next = 13;
          break;

        case 10:
          context$1$0.prev = 10;
          context$1$0.t0 = context$1$0['catch'](0);

          console.error(context$1$0.t0);

        case 13:
          slack.on('error', function (e) {
            console.log(e);
          });
          slack.login();
          return context$1$0.abrupt('return', slack);

        case 16:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this, [[0, 10]]);
  }
};