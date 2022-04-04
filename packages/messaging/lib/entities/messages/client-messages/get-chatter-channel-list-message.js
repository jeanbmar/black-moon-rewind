const Message = require('../../message');

class GetChatterChannelListMessage extends Message {
  static key = 'chat.getChatterChannelList';
  static type = 10075;
}

module.exports = GetChatterChannelListMessage;
