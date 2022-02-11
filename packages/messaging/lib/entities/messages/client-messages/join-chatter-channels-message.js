const { UInt16BE, String } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class JoinChatterChannelsMessage extends Message {
  static type = 0x30;

  constructor() {
    super();
    this.channels = [];
  }

  read(byteStream) {
    for (let i = UInt16BE.read(byteStream); i > 0; i -= 1) {
      this.channels.push({
        name: String.read(byteStream),
        password: String.read(byteStream),
      });
    }
  }
}

module.exports = JoinChatterChannelsMessage;
