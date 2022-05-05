const { String } = require('../../../types');
const Message = require('../../message');

class RemoveFromChatterChannelsMessage extends Message {
  static service = 'chat';
  static key = 'removeFromChatterChannels';
  static type = 10074;

  read(byteStream) {
    this.name = String.read(byteStream);
  }
}

module.exports = RemoveFromChatterChannelsMessage;
