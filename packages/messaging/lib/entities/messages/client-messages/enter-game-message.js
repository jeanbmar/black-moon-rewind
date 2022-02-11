const Message = require('../../message');

class EnterGameMessage extends Message {
  static type = 0x2e;
}

module.exports = EnterGameMessage;
