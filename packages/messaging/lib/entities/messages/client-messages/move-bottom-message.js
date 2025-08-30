const MoveMessage = require('./move-message');

class MoveBottomMessage extends MoveMessage {
  static service = 'world';
  static key = 'moveBottom';
  static type = 10005;
}

module.exports = MoveBottomMessage;
