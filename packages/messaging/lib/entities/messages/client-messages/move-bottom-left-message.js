const MoveMessage = require('./move-message');

class MoveBottomLeftMessage extends MoveMessage {
  static type = 0x06;
}

module.exports = MoveBottomLeftMessage;
