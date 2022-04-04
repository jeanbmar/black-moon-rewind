const { String } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class LoadCharacterMessage extends Message {
  static key = 'loadCharacterMessage';
  static type = 10013;

  read(byteStream) {
    this.name = String.read(byteStream);
  }
}

module.exports = LoadCharacterMessage;
