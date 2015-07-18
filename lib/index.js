'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var SlackClient = require('slack-client'),
    credentials = require('musepm-credentials'),
    Channel = require('slack-client/src/channel');

module.exports = {
  signon: function signon(cfg) {
    var main, creds, monitor, cls, slack;
    return _regeneratorRuntime.async(function signon$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return _regeneratorRuntime.awrap(credentials.getAll('main'));

        case 3:
          main = context$1$0.sent;
          context$1$0.next = 6;
          return _regeneratorRuntime.awrap(credentials.getAll('slack'));

        case 6:
          creds = context$1$0.sent;
          monitor = require('musepm-monitor')(main.accountid, cfg);
          cls = Channel.prototype;

          cls.send = monitor.logCalls('slack', 'send', cls.send);
          slack = new SlackClient(creds[cfg], true, true);
          context$1$0.next = 16;
          break;

        case 13:
          context$1$0.prev = 13;
          context$1$0.t0 = context$1$0['catch'](0);

          console.error(context$1$0.t0);

        case 16:
          slack.on('error', function (e) {
            console.log(e);
          });
          slack.login();
          return context$1$0.abrupt('return', slack);

        case 19:
        case 'end':
          return context$1$0.stop();
      }
    }, null, this, [[0, 13]]);
  }
};