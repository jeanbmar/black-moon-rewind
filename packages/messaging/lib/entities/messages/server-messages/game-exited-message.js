const Message = require('../../message');

class GameExitedMessage extends Message {
  static type = 0x14;
}

module.exports = GameExitedMessage;
