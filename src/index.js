var muse = require('musepm'),
    SlackClient = require('node-slack-client'),
    credentials = require('musepm-credentials');

module.exports = {
  async signon(cfg) {
    let creds = await credentials.getAll();
    var slack = new SlackClient(creds[cfg], true, true);
    return slack;
  }
}

