const { String } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class SendChatterChannelTextMessage extends Message {
  static type = 0x31;

  read(byteStream) {
    this.channelName = String.read(byteStream);
    this.text = String.read(byteStream);
  }
}

module.exports = SendChatterChannelTextMessage;
