const MoveMessage = require('./move-message');

class MoveTopLeftMessage extends MoveMessage {
  static type = 10008;
}

module.exports = MoveTopLeftMessage;
