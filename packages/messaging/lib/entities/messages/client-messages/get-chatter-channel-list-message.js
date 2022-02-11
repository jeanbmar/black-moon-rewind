const Message = require('../../message');

class GetChatterChannelListMessage extends Message {
  static type = 0x4b;
}

module.exports = GetChatterChannelListMessage;
