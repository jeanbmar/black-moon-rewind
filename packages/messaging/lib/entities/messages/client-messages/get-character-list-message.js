const Message = require('../../message');

class GetCharacterListMessage extends Message {
  static type = 0x1a;
}

module.exports = GetCharacterListMessage;
