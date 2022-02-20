const MoveMessage = require('./move-message');

class MoveTopRightMessage extends MoveMessage {
  static type = 10002;
}

module.exports = MoveTopRightMessage;
