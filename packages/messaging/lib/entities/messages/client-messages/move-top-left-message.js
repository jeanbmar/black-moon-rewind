const MoveMessage = require('./move-message');

class MoveTopLeftMessage extends MoveMessage {
  static type = 0x08;
}

module.exports = MoveTopLeftMessage;
