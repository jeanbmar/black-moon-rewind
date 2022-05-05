const Message = require('../../message');

class GameExitedMessage extends Message {
  static service = 'auth';
  static key = 'gameExited';
  static type = 20020;
}

module.exports = GameExitedMessage;
