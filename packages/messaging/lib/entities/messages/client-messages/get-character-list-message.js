const Message = require('../../message');

class GetCharacterListMessage extends Message {
  static type = 10026;
}

module.exports = GetCharacterListMessage;
