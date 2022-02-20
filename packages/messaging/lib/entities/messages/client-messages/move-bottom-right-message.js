const MoveMessage = require('./move-message');

class MoveBottomRightMessage extends MoveMessage {
  static type = 10004;
}

module.exports = MoveBottomRightMessage;
