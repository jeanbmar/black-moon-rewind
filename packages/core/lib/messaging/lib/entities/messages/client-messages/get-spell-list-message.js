const Message = require('../../message');

class GetSpellListMessage extends Message {
  static key = 'getSpellListMessage';
  static type = 10062;
}

module.exports = GetSpellListMessage;
