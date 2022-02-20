const MoveMessage = require('./move-message');

class MoveRightMessage extends MoveMessage {
  static key = 'moveRightMessage';
  static type = 10003;
}

module.exports = MoveRightMessage;
