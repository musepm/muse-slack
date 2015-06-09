var casper = require('casper').create();
var args = casper.cli.args;

casper.start('https://slack.com/', g => {
  var args = casper.cli.args;
  this.fill('form#signup_form', {
      'email': args[0],
      'company': args[1],
      'done1': 1,
      'redir': ''
   }, true);
});

casper.run();


