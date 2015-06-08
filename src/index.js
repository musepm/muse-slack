var SlackClient = require('slack-client'),
    credentials = require('musepm-credentials');

module.exports = {
  async signon(cfg) {
    try {
      var creds = await credentials.getAll('slack');
      var slack = new SlackClient(creds[cfg], true, true);
    } catch (e) {
      console.error(e);
    }
    slack.login();
    return slack;
  }
}

