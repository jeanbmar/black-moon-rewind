const { String } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class ChatterChannelTextMessage extends Message {
  static type = 20049;

  write(byteStream) {
    String.write(byteStream, this.channelName);
    String.write(byteStream, this.senderName);
    String.write(byteStream, this.text);
  }
}

module.exports = ChatterChannelTextMessage;
