"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Promise = require("babel-runtime/core-js/promise")["default"];

require("babel").transform("code", { optional: ["runtime"] });

require("shelljs/global");

var prompt = require("prompt"),
    pr = require("es6-promisify"),
    promptGet = pr(prompt.get),
    credentials = require("musepm-credentials");

function go() {
  var email, su, _answer, _ans2, prompts, info;

  return _regeneratorRuntime.async(function go$(context$1$0) {
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
          context$1$0.next = 30;
          break;
        }

        console.log("kkoii");
        context$1$0.prev = 17;
        context$1$0.next = 20;
        return promptGet(["Email", "Company"]);

      case 20:
        _ans2 = context$1$0.sent;
        context$1$0.next = 26;
        break;

      case 23:
        context$1$0.prev = 23;
        context$1$0.t1 = context$1$0["catch"](17);

        console.log(context$1$0.t1);

      case 26:
        email = ans2.email;
        context$1$0.next = 29;
        return new _Promise(function (res) {
          exec("casperjs newacct " + email + " " + ans2.Company, function (code, o) {
            res();
          });
        });

      case 29:

        console.log(" \n   Please click the button in the email from Slack\n   and fill out the form in the browser to create \n   a Slack team. Then return to this terminal window.\n   ");

      case 30:
        console.log("uu");
        if (email == "") {
          prompts = ["email"];
        } else {
          prompts = [];
        }
        prompts.push("teamdomain", "password", "botname");
        context$1$0.next = 35;
        return promptGet(prompts);

      case 35:
        info = context$1$0.sent;
        context$1$0.next = 38;
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

      case 38:
      case "end":
        return context$1$0.stop();
    }
  }, null, this, [[5, 11], [17, 23]]);
}

go().then(function (r) {
  console.log("Done");
});