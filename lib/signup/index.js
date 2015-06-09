'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

require('shelljs/global');

var prompt = require('prompt'),
    pr = require('es6-promisify'),
    promptGet = pr(prompt.get),
    credentials = require('musepm-credentials');

function go() {
  var email, su, _ans2, prompts, info, n;

  return _regeneratorRuntime.async(function go$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        email = '';

        prompt.message = '>'.green;
        prompt.start();

        su = '\n\n---------------------------------------------------------------\n\nDo you have a Slack account?\n\n';

        console.log(su);

        try {
          //let answer = await promptGet(['yn']);
          promptGet(['yn']).then(function (xx) {
            console.log(xx);
          });
        } catch (e) {
          console.error(e);
        }
        console.log(answer);

        if (!(answer.yn == 'n')) {
          context$1$0.next = 20;
          break;
        }

        console.log('kkoii');
        context$1$0.prev = 9;
        context$1$0.next = 12;
        return promptGet(['Email', 'Company']);

      case 12:
        _ans2 = context$1$0.sent;
        context$1$0.next = 18;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](9);

        console.log(context$1$0.t0);

      case 18:
        email = ans2.email; /*
                            let x = await new Promise( (res) => {
                            exec(`casperjs newacct ${email} ${ans2.Company}`, (code, o) => { 
                            res();
                            });
                            }); */

        console.log(' \n   Please click the button in the email from Slack\n   and fill out the form in the browser to create \n   a Slack team. Then return to this terminal window.\n   ');

      case 20:
        console.log('uu');
        if (email == '') {
          prompts = ['email'];
        } else {
          prompts = [];
        }
        prompts.push('teamdomain', 'password', 'botname');
        context$1$0.next = 25;
        return promptGet(prompts);

      case 25:
        info = context$1$0.sent;
        context$1$0.next = 28;
        return new _Promise(function (res) {
          var opts = { async: true, silent: false };
          exec('casperjs newbot ' + info.teamdomain + ' ' + info.email + ' ' + info.password + ' ' + info.botname, opts, function (code, o) {
            var token = o.split('|')[1];
            var slack = { slack: {} };
            slack.slack[info.botname] = token;
            credentials.newCredentials(slack);
            res();
          });
        });

      case 28:
        n = context$1$0.sent;

        console.log('k');

      case 30:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[9, 15]]);
}

go().then(function (r) {
  console.log('Done');
});