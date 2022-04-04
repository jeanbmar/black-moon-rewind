const MoveMessage = require('./move-message');

class MoveRightMessage extends MoveMessage {
  static key = 'world.moveRight';
  static type = 10003;
}

module.exports = MoveRightMessage;
