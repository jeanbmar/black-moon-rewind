const Message = require('../../message');

class GetSpellListMessage extends Message {
  static key = 'world.getSpellList';
  static type = 10062;
}

module.exports = GetSpellListMessage;
