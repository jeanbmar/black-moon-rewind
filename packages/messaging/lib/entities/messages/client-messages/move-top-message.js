const MoveMessage = require('./move-message');

class MoveTopMessage extends MoveMessage {
  static type = 0x01;
}

module.exports = MoveTopMessage;
