const { String } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class RemoveFromChatterChannelsMessage extends Message {
  static type = 0x4a;

  read(byteStream) {
    this.name = String.read(byteStream);
  }
}

module.exports = RemoveFromChatterChannelsMessage;
