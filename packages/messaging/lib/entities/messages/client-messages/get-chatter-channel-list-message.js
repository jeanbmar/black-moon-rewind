const Message = require('../../message');

class GetChatterChannelListMessage extends Message {
  static key = 'getChatterChannelListMessage';
  static type = 10075;
}

module.exports = GetChatterChannelListMessage;
