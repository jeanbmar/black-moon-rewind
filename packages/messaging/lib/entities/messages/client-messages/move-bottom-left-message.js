const MoveMessage = require('./move-message');

class MoveBottomLeftMessage extends MoveMessage {
  static key = 'moveBottomLeftMessage';
  static type = 10006;
}

module.exports = MoveBottomLeftMessage;
