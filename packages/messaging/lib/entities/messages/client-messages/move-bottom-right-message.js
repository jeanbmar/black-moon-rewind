const MoveMessage = require('./move-message');

class MoveBottomRightMessage extends MoveMessage {
  static service = 'world';
  static key = 'moveBottomRight';
  static type = 10004;
}

module.exports = MoveBottomRightMessage;
