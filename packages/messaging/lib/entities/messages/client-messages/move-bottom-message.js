const MoveMessage = require('./move-message');

class MoveBottomMessage extends MoveMessage {
  static key = 'world.moveBottom';
  static type = 10005;
}

module.exports = MoveBottomMessage;