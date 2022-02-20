const { String } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class RegisterAccountMessage extends Message {
  static key = 'registerAccountMessage';
  static type = 10014;

  read(byteStream) {
    this.id = String.read(byteStream);
    this.password = String.read(byteStream);
  }
}

module.exports = RegisterAccountMessage;
