const Message = require('../../message');

class GetSpellListMessage extends Message {
  static type = 10062;
}

module.exports = GetSpellListMessage;
