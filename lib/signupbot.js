var casper = require('casper').create();

console.log(casper.cli.args);
var args = casper.cli.args;
var teamdomain = args[0];
var email = args[1];
var pass = args[2];
var botname = args[3];

console.log(teamdomain,email,pass);

casper.start('https://'+teamdomain+'.slack.com/', function() {
  var args = casper.cli.args;
  this.fill('form#signin_form', {
          'email':    email,
          'password': pass,
          'signin': 1,
          'redir': ''
       }, true);
});

casper.then(function() {
  this.echo('Logging in...');
  this.wait(600, function() {
    this.echo('OK.');
  });
});

casper.thenOpen('https://my.slack.com/services/new/bot', function() {
  this.fill('form#service_config', {
    'bot_name': botname,
    'add_service': 1
  }, true);
});

casper.then(function() {
  var token = this.getElementAttribute('#small_input','value');
  this.echo('Saving token [' + token+']');
  var creds = { slack: {} };
  creds.slack[botname] = token;
  this.capture('token.png');
});
                                           
casper.run();

