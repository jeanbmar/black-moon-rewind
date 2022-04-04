const { String } = require('../../../types');
const Message = require('../../message');

class LoadCharacterMessage extends Message {
  static key = 'world.loadCharacter';
  static type = 10013;

  read(byteStream) {
    this.name = String.read(byteStream);
  }
}

module.exports = LoadCharacterMessage;
