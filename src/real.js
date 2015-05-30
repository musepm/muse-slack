var musepm = require('musepm'),
    pr = rewuire('es6-promisify'),
    credentials = require('musepm-credentials'),
    Slack = require('slack-client');

class Slack extends musepm.Api {

  constructor(botname) {
    this.botname = botname;
    let tokens = await credentials.getAll('slack');
    this.slack = new Slack(tokens[botname], true, true);

    this.slack.on('error', err => {
      console.error("Error: " + err);
    });

    this.slack.login();

    await pr(this.slack.on)('open');
  };

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
    this.slack.getChannelByName.send(text);
  }

}
