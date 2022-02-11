const MoveMessage = require('./move-message');

class MoveTopRightMessage extends MoveMessage {
  static type = 0x02;
}

module.exports = MoveTopRightMessage;
