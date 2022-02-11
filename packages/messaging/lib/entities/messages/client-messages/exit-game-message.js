const Message = require('../../message');

class ExitGameMessage extends Message {
  static type = 0x14;
}

module.exports = ExitGameMessage;
