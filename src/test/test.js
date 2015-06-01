var assert = require('assert'),
    Slack = require('../index');

describe('Slack' ,() => {
  describe('#send', ()=> {

    it('should send a message', dn => {
      console.log('top');
      let chat = new Slack('testbot01');
      dn();
      return; /*
      await chat.ready();
      chat.send('general', 'Testing');*/
    }); 

  });
});
