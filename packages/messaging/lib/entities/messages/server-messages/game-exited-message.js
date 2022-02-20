const Message = require('../../message');

class GameExitedMessage extends Message {
  static type = 20020;
}

module.exports = GameExitedMessage;
