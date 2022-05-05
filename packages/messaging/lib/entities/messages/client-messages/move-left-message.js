const MoveMessage = require('./move-message');

class MoveLeftMessage extends MoveMessage {
  static service = 'world';
  static key = 'moveLeft';
  static type = 10007;
}

module.exports = MoveLeftMessage;
