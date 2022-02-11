const { Int32BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class AuthenticateServerVersionMessage extends Message {
  static type = 0x63;

  read(byteStream) {
    this.clientVersion = Int32BE.read(byteStream);
  }
}

module.exports = AuthenticateServerVersionMessage;
