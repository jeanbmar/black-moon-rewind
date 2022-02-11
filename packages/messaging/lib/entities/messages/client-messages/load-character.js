const { String } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class LoadCharacter extends Message {
  static type = 0x0d;

  read(byteStream) {
    this.accountName = String.read(byteStream);
  }
}

module.exports = LoadCharacter;
