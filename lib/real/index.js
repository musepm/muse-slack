'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var musepm = require('musepm'),
    pr = require('es6-promisify'),
    credentials = require('musepm-credentials'),
    SlackClient = require('slack-client');

var Slack = (function (_musepm$Api) {
  function Slack(botname) {
    _classCallCheck(this, Slack);

    _get(Object.getPrototypeOf(Slack.prototype), 'constructor', this).call(this, botname);

    this.botname = botname;
    var self = this;
    credentials.getAll('slack').then(function (tokens) {
      self.slack = new SlackClient(tokens[botname], true, true);

      self.slack.on('open', function (m) {
        self.emit('ready', {});
      });

      self.slack.on('error', function (err) {
        console.error('Error: ' + err);
      });

      self.slack.on('raw_message', function (msg) {
        console.log('raw message slack: ', msg);
      });

      self.slack.login();
    });
  }

  _inherits(Slack, _musepm$Api);

  _createClass(Slack, [{
    key: 'onMsg',
    value: function onMsg(fn) {
      this.slack.on('message', function (message) {
        var channel, channelError, channelName, errors, response, text, textError, ts, type, typeError, user, userName;
        var msg = message;
        msg.channelId = message.channel;
        channel = slack.getChannelGroupOrDMByID(msg.channelId);
        msg.userId = msg.user;
        user = slack.getUserByID(message.userId);

        channelName = (channel != null ? channel.is_channel : void 0) ? '#' : '';
        msg.channel = channelName + (channel ? channel.name : 'UNKNOWN_CHANNEL');

        msg.user = (user != null ? user.name : void 0) != null ? '@' + user.name : 'UNKNOWN_USER';
        fn(msg);
      });
    }
  }, {
    key: 'send',
    value: function send(channel, text) {
      this.slack.getChannelByName(channel).send(text);
    }
  }]);

  return Slack;
})(musepm.Api);

module.exports = Slack;