const Message = require('../../message');

class GetCharacterListMessage extends Message {
  static service = 'auth';
  static key = 'getCharacterList';
  static type = 10026;
}

module.exports = GetCharacterListMessage;
