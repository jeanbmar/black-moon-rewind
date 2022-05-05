const MoveMessage = require('./move-message');

class MoveRightMessage extends MoveMessage {
  static service = 'world';
  static key = 'moveRight';
  static type = 10003;
}

module.exports = MoveRightMessage;
