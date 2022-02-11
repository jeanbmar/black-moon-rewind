const Message = require('../../message');

class GetChatterChannelList extends Message {
  static type = 0x4b;
}

module.exports = GetChatterChannelList;
