var SlackClient = require('slack-client'),
    credentials = require('musepm-credentials'),
    Channel = require('slack-client/src/Channel'),
    monitor = require('musepm-monitor');

monitor.logCalls('slack','send','Channel.prototype.send'

module.exports = {
  async signon(cfg) {
    try { 
      var cls = Channel.prototype; 
      cls.send = monitor.logCalls('slack','send', cls.send);
      var creds = await credentials.getAll('slack');
      var slack = new SlackClient(creds[cfg], true, true);
    } catch (e) {
      console.error(e);
    }
    slack.login();
    return slack;
  }
}


