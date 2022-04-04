const MoveMessage = require('./move-message');

class MoveBottomRightMessage extends MoveMessage {
  static key = 'moveBottomRightMessage';
  static type = 10004;
}

module.exports = MoveBottomRightMessage;
