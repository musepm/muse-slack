require("babel").transform("code", { optional: ["runtime"] });

require('shelljs/global');

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
  console.log(answer);
  if (answer.yn == 'n') {
    console.log('kkoii');
    let ans2 = await promptGet(['Email', 'Company']);
    email = ans2.email;    
    await new Promise( (res) => {
     exec(`casperjs newacct ${email} ${ans2.Company}`, (code, o) => { 
       res();
     });
   });
    
   console.log(` 
   Please click the button in the email from Slack
   and fill out the form in the browser to create 
   a Slack team. Then return to this terminal window.
   `); 
  }
  console.log('uu');
  if (email == '') { 
    var prompts = ['email'];
  } else {
    var prompts = [];
  }
  prompts.push('teamdomain', 'password', 'botname');
  let info = await promptGet(prompts);

  await new Promise( (res) => {
    let opts = {async:true, silent:false};
    exec(`casperjs newbot ${info.teamdomain} ${info.email} ${info.password} ${info.botname}`, opts, (code, o) => {
      var token = o.split('|')[1];
      var slack = { slack: { } };
      slack.slack[info.botname] = token;
      credentials.newCredentials(slack);
      res();
    });
  });

}()
