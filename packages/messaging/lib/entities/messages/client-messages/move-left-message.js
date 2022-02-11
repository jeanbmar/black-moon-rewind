const MoveMessage = require('./move-message');

class MoveLeftMessage extends MoveMessage {
  static type = 0x07;
}

module.exports = MoveLeftMessage;
