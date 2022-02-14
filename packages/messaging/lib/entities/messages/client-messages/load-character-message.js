const { String } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class LoadCharacterMessage extends Message {
  static type = 0x0d;

  read(byteStream) {
    this.name = String.read(byteStream);
  }
}

module.exports = LoadCharacterMessage;
