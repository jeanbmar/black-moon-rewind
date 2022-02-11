const MoveMessage = require('./move-message');

class MoveBottomMessage extends MoveMessage {
  static type = 0x05;
}

module.exports = MoveBottomMessage;
