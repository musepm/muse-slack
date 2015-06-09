"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Promise = require("babel-runtime/core-js/promise")["default"];

var _this2 = this;

require("babel").transform("code", { optional: ["runtime"] });

require("shelljs/global");

var prompt = require("prompt"),
    pr = require("es6-promisify"),
    promptGet = pr(prompt.get),
    credentials = require("musepm-credentials");

(function callee$0$0(f) {
  var email, su, _answer, prompts, info;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        email = "";

        prompt.message = ">".green;
        prompt.start();

        su = "\n\n---------------------------------------------------------------\n\nDo you have a Slack account?\n\n";

        console.log(su);

        context$1$0.prev = 5;
        context$1$0.next = 8;
        return promptGet(["yn"]);

      case 8:
        _answer = context$1$0.sent;
        context$1$0.next = 14;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0["catch"](5);

        console.error(context$1$0.t0);

      case 14:
        console.log(answer);

        if (!(answer.yn == "n")) {
          context$1$0.next = 18;
          break;
        }

        context$1$0.next = 18;
        return (function callee$1$0() {
          var ans2;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                console.log("kkoii");
                context$2$0.next = 3;
                return promptGet(["Email", "Company"]);

              case 3:
                ans2 = context$2$0.sent;

                email = ans2.email;
                context$2$0.next = 7;
                return new _Promise(function (res) {
                  exec("casperjs newacct " + email + " " + ans2.Company, function (code, o) {
                    res();
                  });
                });

              case 7:

                console.log(" \n   Please click the button in the email from Slack\n   and fill out the form in the browser to create \n   a Slack team. Then return to this terminal window.\n   ");

              case 8:
              case "end":
                return context$2$0.stop();
            }
          }, null, _this);
        })();

      case 18:
        console.log("uu");
        if (email == "") {
          prompts = ["email"];
        } else {
          prompts = [];
        }
        prompts.push("teamdomain", "password", "botname");
        context$1$0.next = 23;
        return promptGet(prompts);

      case 23:
        info = context$1$0.sent;
        context$1$0.next = 26;
        return new _Promise(function (res) {
          var opts = { async: true, silent: false };
          exec("casperjs newbot " + info.teamdomain + " " + info.email + " " + info.password + " " + info.botname, opts, function (code, o) {
            var token = o.split("|")[1];
            var slack = { slack: {} };
            slack.slack[info.botname] = token;
            credentials.newCredentials(slack);
            res();
          });
        });

      case 26:
      case "end":
        return context$1$0.stop();
    }
  }, null, _this2, [[5, 11]]);
})();