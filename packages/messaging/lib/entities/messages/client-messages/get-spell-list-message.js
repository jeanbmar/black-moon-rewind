const Message = require('../../message');

class GetSpellListMessage extends Message {
  static type = 0x3e;
}

module.exports = GetSpellListMessage;
