'use strict';

var casper = require('casper').create();
var args = casper.cli.args;

casper.start('https://slack.com/', function (g) {
    var args = casper.cli.args;
    undefined.fill('form#signup_form', {
        'email': args[0],
        'company': args[1],
        'done1': 1,
        'redir': ''
    }, true);
});

casper.run();