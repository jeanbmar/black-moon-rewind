const MoveMessage = require('./move-message');

class MoveRightMessage extends MoveMessage {
  static type = 0x03;
}

module.exports = MoveRightMessage;
