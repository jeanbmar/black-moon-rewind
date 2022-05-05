const Message = require('../../message');

class GetChatterChannelListMessage extends Message {
  static service = 'chat';
  static key = 'getChatterChannelList';
  static type = 10075;
}

module.exports = GetChatterChannelListMessage;
