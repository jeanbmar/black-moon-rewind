const { String } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class RemoveFromChatterChannelsMessage extends Message {
  static key = 'removeFromChatterChannelsMessage';
  static type = 10074;

  read(byteStream) {
    this.name = String.read(byteStream);
  }
}

module.exports = RemoveFromChatterChannelsMessage;
