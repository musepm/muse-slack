'use strict';

var rlp = require('readlinr-prompter');

var su = '\n\n---------------------------------------------------------------\n\nPlease visit https://slack.com to sign up.\nAfter signing up, click the activation link in the email.\nFollow the instructions to create a team.\n\nThen create a new bot integration at https://my.slack.com/services/new/bot\n\nCopy and paste your token below:\n';
console.log(su);

rlp(['Token'], {}, {}).end(function (results) {

  require('muse').newCredentials({ 'slack': { 'token': results.token } });
});