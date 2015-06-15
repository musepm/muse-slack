'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

require('shelljs/global');

var prompt = require('prompt'),
    pr = require('es6-promisify'),
    promptGet = pr(prompt.get),
    credentials = require('musepm-credentials');

function go() {
  var email, su, answer, ans2, x, prompts, info, n;
  return _regeneratorRuntime.async(function go$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        email = '';

        prompt.message = '>'.green;
        prompt.start();

        su = '\n\n---------------------------------------------------------------\n\nDo you have a Slack account?\n\n';

        console.log(su);

        context$1$0.prev = 5;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(promptGet(['yn']));

      case 8:
        answer = context$1$0.sent;
        context$1$0.next = 14;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](5);

        console.error(context$1$0.t0);

      case 14:
        if (!(answer.yn == 'n')) {
          context$1$0.next = 29;
          break;
        }

        context$1$0.prev = 15;
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(promptGet(['Email', 'Company']));

      case 18:
        ans2 = context$1$0.sent;
        context$1$0.next = 24;
        break;

      case 21:
        context$1$0.prev = 21;
        context$1$0.t1 = context$1$0['catch'](15);

        console.log(context$1$0.t1);

      case 24:
        email = ans2.Email;
        context$1$0.next = 27;
        return _regeneratorRuntime.awrap(new _Promise(function (res) {
          exec('casperjs ' + __dirname + '/newacct.js ' + email + ' ' + ans2.Company, function (code, o) {
            res();
          });
        }));

      case 27:
        x = context$1$0.sent;

        console.log(' \n   Please click the button in the email from Slack\n   and fill out the form in the browser to create \n   a Slack team. Then return to this terminal window.\n   ');

      case 29:

        if (email == '') {
          prompts = ['email'];
        } else {
          prompts = [];
        }
        prompts.push('teamdomain', 'password', 'botname');
        context$1$0.next = 33;
        return _regeneratorRuntime.awrap(promptGet(prompts));

      case 33:
        info = context$1$0.sent;

        if (info.email) email = info.email;
        context$1$0.next = 37;
        return _regeneratorRuntime.awrap(new _Promise(function (res) {
          var opts = { async: true, silent: false };
          exec('casperjs ' + __dirname + '/newbot.js ' + info.teamdomain + ' ' + email + ' ' + info.password + ' ' + info.botname, opts, function (code, o) {
            var token = o.split('|')[1];
            var slack = { slack: {} };
            slack.slack[info.botname] = token;
            credentials.newCredentials(slack);
            res();
          });
        }));

      case 37:
        n = context$1$0.sent;

      case 38:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[5, 11], [15, 21]]);
}

try {
  go().then(function (r) {
    console.log('Done');
  });
} catch (e) {
  console.error(e);
}