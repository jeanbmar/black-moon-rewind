const MoveMessage = require('./move-message');

class MoveBottomRightMessage extends MoveMessage {
  static type = 0x04;
}

module.exports = MoveBottomRightMessage;
