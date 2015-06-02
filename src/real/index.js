var musepm = require('musepm'),
    pr = require('es6-promisify'),
    credentials = require('musepm-credentials'),
    SlackClient = require('slack-client');

class Slack extends musepm.Api {

  constructor(botname) {
    super(botname);

    this.botname = botname;
    var self = this;
    credentials.getAll('slack')
    .then( tokens => {
      self.slack = new SlackClient(tokens[botname], true, true);

      self.slack.on('open', m => {
        self.emit('ready', {});
      });

      self.slack.on('error', err => {
        console.error("Error: " + err);
      });
      
      self.slack.on('raw_message', msg => {
        console.log('raw message slack: ', msg);  
      });  
      
      self.slack.login();      
    });
  }


  onMsg(fn) {
    this.slack.on('message', message => {
      var channel, channelError, channelName, errors, response, text, textError, ts, type, typeError, user, userName;
      var msg = message;
      msg.channelId = message.channel;
      channel = slack.getChannelGroupOrDMByID(msg.channelId);
      msg.userId = msg.user;
      user = slack.getUserByID(message.userId);
     
      channelName = (channel != null ? channel.is_channel : void 0) ? '#' : '';
      msg.channel = channelName + (channel ? channel.name : 'UNKNOWN_CHANNEL');

      msg.user = (user != null ? user.name : void 0) != null ? "@" + user.name : "UNKNOWN_USER";
      fn(msg);
    });
  }

  send(channel, text) {
    this.slack.getChannelByName(channel).send(text);
  }

}

module.exports = Slack;
