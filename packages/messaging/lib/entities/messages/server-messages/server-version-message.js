const { Int32BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class ServerVersionMessage extends Message {
  static type = 0x63;

  write(byteStream) {
    Int32BE.write(byteStream, this.status ?? 1);
  }
}

module.exports = ServerVersionMessage;
