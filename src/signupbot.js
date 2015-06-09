var casper = require('casper').create();
require("babel").transform("code", { optional: ["runtime"] });

let prompt = require('prompt'),
    pr = require('es6-promisify'),
    promptGet = pr(prompt.get),
    credentials = require('musepm-credentials');

async f => {

  var email = '';

  prompt.message = '>'.green;
  prompt.start();
 
  let su = `

---------------------------------------------------------------

Do you have a Slack account?

`
  console.log(su);

  let answer = await promptGet(['yn']);

  if (answer.yn == 'n') {
    let ans2 = await promptGet(['Email', 'Company']);
    email = ans2.email;
    casper.start('https://slack.com/', g => {
      var args = casper.cli.args;
      this.fill('form#signup_form', {
          'email': email,
          'company': ans2.company,
          'done1': 1,
          'redir': ''
       }, true);
   });

   casper.run();

   console.log(`
   Please click the button in the email from Slack
   and fill out the form in the browser to create 
   a Slack team. Then return to this terminal window.
   `); 
  }

  if (email == '') { 
    var prompts = ['email'];
  } else {
    var prompts = [];
  }
  prompts.push('teamdomain', 'password', 'botname');
  let info = await promptGet(prompts);

  var casper = require('casper').create();

  casper.start('https://'+info.teamdomain+'.slack.com/', function() {
    var args = casper.cli.args;
    this.fill('form#signin_form', {
            'email':    email,
            'password': info.password,
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
      'bot_name': info.botname,
      'add_service': 1
    }, true);
  });

  casper.then(function() {
    var token = this.getElementAttribute('#small_input','value');
    this.echo('Saving token [' + token+']');
    var creds = { slack: {} };
    creds.slack[botname] = token;

    let data = {  'slack': {}};
    data.slack[results['Bot name']] = results.Token;
    credentials.newCredentials(data);
  });
                                             
  casper.run();

}()
