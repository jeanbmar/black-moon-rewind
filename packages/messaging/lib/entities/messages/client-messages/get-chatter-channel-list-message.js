const Message = require('../../message');

class GetChatterChannelListMessage extends Message {
  static type = 10075;
}

module.exports = GetChatterChannelListMessage;
