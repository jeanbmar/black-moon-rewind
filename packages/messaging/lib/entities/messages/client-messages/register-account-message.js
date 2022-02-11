const { String } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class RegisterAccountMessage extends Message {
  static type = 0x0e;

  read(byteStream) {
    this.accountName = String.read(byteStream);
    this.password = String.read(byteStream);
  }
}

module.exports = RegisterAccountMessage;
