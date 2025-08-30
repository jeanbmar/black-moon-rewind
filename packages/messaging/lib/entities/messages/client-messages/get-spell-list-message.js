const Message = require('../../message');

class GetSpellListMessage extends Message {
  static service = 'world';
  static key = 'getSpellList';
  static type = 10062;
}

module.exports = GetSpellListMessage;
