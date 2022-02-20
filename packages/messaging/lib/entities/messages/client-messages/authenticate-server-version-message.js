const { Int32BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class AuthenticateServerVersionMessage extends Message {
  static type = 10099;

  read(byteStream) {
    this.clientVersion = Int32BE.read(byteStream);
  }
}

module.exports = AuthenticateServerVersionMessage;
