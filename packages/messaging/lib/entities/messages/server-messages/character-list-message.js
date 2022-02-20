const {
  UInt8,
  String,
  UInt16BE,
} = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class CharacterListMessage extends Message {
  static key = 'characterListMessage';
  static type = 20026;

  constructor() {
    super();
    this.characters = [];
  }

  write(byteStream) {
    UInt8.write(byteStream, this.characters.length);
    this.characters.forEach((character) => {
      String.write(byteStream, character.name);
      UInt16BE.write(byteStream, character.level);
    });
  }
}

module.exports = CharacterListMessage;
