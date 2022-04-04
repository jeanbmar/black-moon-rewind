const Message = require('../../message');

class GameExitedMessage extends Message {
  static key = 'gameExitedMessage';
  static type = 20020;
}

module.exports = GameExitedMessage;
