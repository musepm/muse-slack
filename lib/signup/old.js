'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _this = this;

var prompt = require('prompt'),
    pr = require('es6-promisify'),
    promptGet = pr(prompt.get),
    credentials = require('musepm-credentials');

(function callee$0$0(f) {
  var su, results, data;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        su = '\n\n---------------------------------------------------------------\n\nPlease visit https://slack.com to sign up.\nAfter signing up, click the activation link in the email.\nFollow the instructions to create a team.\n\nThen create a new bot integration at https://my.slack.com/services/new/bot\n\nCopy and paste your token below:\n';

        console.log(su);

        prompt.message = '>'.green;
        prompt.start();

        context$1$0.next = 6;
        return promptGet(['Bot name', 'Token']);

      case 6:
        results = context$1$0.sent;
        data = { 'slack': {} };

        data.slack[results['Bot name']] = results.Token;
        context$1$0.next = 11;
        return credentials.newCredentials(data);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
})();