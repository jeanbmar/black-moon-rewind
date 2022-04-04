const Message = require('../../message');

class GameExitedMessage extends Message {
  static key = 'auth.gameExited';
  static type = 20020;
}

module.exports = GameExitedMessage;
