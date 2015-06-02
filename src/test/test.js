var assert = require('assert'),
    muse = require('musepm'),
    slack = require('../index');

describe('Slack' ,() => {
  describe('#send', ()=> {

    it('should send a message', dn => {
      let chat = slack.make('testbot01');
      chat.on('ready', f => {
        chat.send('general', 'Testing 4545');
        dn();
      });
    });
  });
});
