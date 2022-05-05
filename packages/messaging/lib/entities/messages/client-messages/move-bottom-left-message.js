const MoveMessage = require('./move-message');

class MoveBottomLeftMessage extends MoveMessage {
  static service = 'world';
  static key = 'moveBottomLeft';
  static type = 10006;
}

module.exports = MoveBottomLeftMessage;
