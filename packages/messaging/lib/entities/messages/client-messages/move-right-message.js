const MoveMessage = require('./move-message');

class MoveRightMessage extends MoveMessage {
  static type = 10003;
}

module.exports = MoveRightMessage;
