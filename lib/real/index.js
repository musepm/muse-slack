'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var musepm = require('musepm'),
    pr = require('es6-promisify'),
    credentials = require('musepm-credentials'),
    SlackClient = require('slack-client');

var Slack = (function (_musepm$Api) {
  function Slack(botname) {
    var _this = this;

    _classCallCheck(this, Slack);

    console.log('hi');
    return;

    _get(Object.getPrototypeOf(Slack.prototype), 'constructor', this).call(this, botname);

    this.botname = botname;
    console.log('get creds');
    credentials.getAll('slack').then(function (tokens) {
      console.log('tokens is', tokens);
      _this.slack = new SlackClient(tokens[botname], true, true);

      _this.slack.on('error', function (err) {
        console.error('Error: ' + err);
      });

      _this.slack.login();
    });
  }

  _inherits(Slack, _musepm$Api);

  _createClass(Slack, [{
    key: 'ready',
    value: function ready() {
      return _regeneratorRuntime.async(function ready$(context$2$0) {
        var _this2 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', new _Promise(function (res) {
              _this2.slack.on('open', res);
            }));

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
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
      this.slack.getChannelByName.send(text);
    }
  }]);

  return Slack;
})(musepm.Api);

module.exports = Slack;