const Message = require('../../message');

class GetCharacterListMessage extends Message {
  static key = 'auth.getCharacterList';
  static type = 10026;
}

module.exports = GetCharacterListMessage;
