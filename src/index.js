var SlackClient = require('slack-client'),
    credentials = require('musepm-credentials'),
    Channel = require('slack-client/src/channel');

module.exports = {
  async signon(cfg) {
    try {
      var monitor = require('musepm-monitor')(cfg);
      var cls = Channel.prototype; 
      cls.send = monitor.logCalls('slack','send', cls.send);
      var creds = await credentials.getAll('slack');
      var slack = new SlackClient(creds[cfg], true, true);
    } catch (e) {
      console.error(e);
    }
    slack.on('error', function(e) {
     console.log(e);
    });
    slack.login();
    return slack;
  }
}


