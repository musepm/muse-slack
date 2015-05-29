#!/usr/bin/env node

let rlp = require('readline-prompter');

let su = `

---------------------------------------------------------------

Please visit https://slack.com to sign up.
After signing up, click the activation link in the email.
Follow the instructions to create a team.

Then create a new bot integration at https://my.slack.com/services/new/bot

Copy and paste your token below:
`
console.log(su);

rlp(['Token'], {}, {}).end( results => {

  require('muse').newCredentials(
    {  'slack': { 'token': results.token } }
  );

});