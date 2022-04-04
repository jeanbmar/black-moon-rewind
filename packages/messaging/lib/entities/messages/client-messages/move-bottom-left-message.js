const MoveMessage = require('./move-message');

class MoveBottomLeftMessage extends MoveMessage {
  static key = 'world.moveBottomLeft';
  static type = 10006;
}

module.exports = MoveBottomLeftMessage;
