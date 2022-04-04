const { String } = require('../../../types');
const Message = require('../../message');

class RemoveFromChatterChannelsMessage extends Message {
  static key = 'chat.removeFromChatterChannels';
  static type = 10074;

  read(byteStream) {
    this.name = String.read(byteStream);
  }
}

module.exports = RemoveFromChatterChannelsMessage;
