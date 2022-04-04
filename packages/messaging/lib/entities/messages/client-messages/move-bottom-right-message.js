const MoveMessage = require('./move-message');

class MoveBottomRightMessage extends MoveMessage {
  static key = 'world.moveBottomRight';
  static type = 10004;
}

module.exports = MoveBottomRightMessage;
