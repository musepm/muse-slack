var assert = require('assert'),
    Slack = require('../index');

describe('Slack' ,() => {
  describe('#send', ()=> {

    it('should send a message', dn => {
      let chat = new Slack('test');
      chat.send('general', 'Testing'); 
      dn();
    }); 

  });
});
