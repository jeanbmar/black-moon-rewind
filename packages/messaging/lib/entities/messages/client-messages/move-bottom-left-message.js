const MoveMessage = require('./move-message');

class MoveBottomLeftMessage extends MoveMessage {
  static type = 10006;
}

module.exports = MoveBottomLeftMessage;
