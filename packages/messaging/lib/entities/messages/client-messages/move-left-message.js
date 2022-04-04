const MoveMessage = require('./move-message');

class MoveLeftMessage extends MoveMessage {
  static key = 'world.moveLeft';
  static type = 10007;
}

module.exports = MoveLeftMessage;
