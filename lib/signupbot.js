'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _this2 = this;

var casper = require('casper').create();

var prompt = require('prompt'),
    pr = require('es6-promisify'),
    promptGet = pr(prompt.get),
    credentials = require('musepm-credentials');

(function callee$0$0(f) {
  var email, su, answer, prompts, info, casper;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        email = '';

        prompt.message = '>'.green;
        prompt.start();

        su = '\n\n---------------------------------------------------------------\n\nDo you have a Slack account?\n\n';

        console.log(su);

        context$1$0.next = 7;
        return promptGet(['yn']);

      case 7:
        answer = context$1$0.sent;

        if (!(answer.yn == 'n')) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 11;
        return (function callee$1$0() {
          var ans2;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return promptGet(['Email', 'Company']);

              case 2:
                ans2 = context$2$0.sent;

                email = ans2.email;
                casper.start('https://slack.com/', function (g) {
                  var args = casper.cli.args;
                  undefined.fill('form#signup_form', {
                    'email': email,
                    'company': ans2.company,
                    'done1': 1,
                    'redir': ''
                  }, true);
                });

                casper.run();

                console.log('\n   Please click the button in the email from Slack\n   and fill out the form in the browser to create \n   a Slack team. Then return to this terminal window.\n   ');

              case 7:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        })();

      case 11:

        if (email == '') {
          prompts = ['email'];
        } else {
          prompts = [];
        }
        prompts.push('teamdomain', 'password', 'botname');
        context$1$0.next = 15;
        return promptGet(prompts);

      case 15:
        info = context$1$0.sent;
        casper = require('casper').create();

        casper.start('https://' + info.teamdomain + '.slack.com/', function () {
          var args = casper.cli.args;
          this.fill('form#signin_form', {
            'email': email,
            'password': info.password,
            'signin': 1,
            'redir': ''
          }, true);
        });

        casper.then(function () {
          this.echo('Logging in...');
          this.wait(600, function () {
            this.echo('OK.');
          });
        });

        casper.thenOpen('https://my.slack.com/services/new/bot', function () {
          this.fill('form#service_config', {
            'bot_name': info.botname,
            'add_service': 1
          }, true);
        });

        casper.then(function () {
          var token = this.getElementAttribute('#small_input', 'value');
          this.echo('Saving token [' + token + ']');
          var creds = { slack: {} };
          creds.slack[botname] = token;

          var data = { 'slack': {} };
          data.slack[results['Bot name']] = results.Token;
          credentials.newCredentials(data);
        });

        casper.run();

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this2);
})();