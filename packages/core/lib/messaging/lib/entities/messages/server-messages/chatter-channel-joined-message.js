const { String, Int32BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class ChatterChannelJoinedMessage extends Message {
  static key = 'chatterChannelJoinedMessage';
  static type = 20048;

  write(byteStream) {
    Int32BE.write(byteStream, this.a ?? 100);
    String.write(byteStream, this.name);
  }
}

module.exports = ChatterChannelJoinedMessage;
