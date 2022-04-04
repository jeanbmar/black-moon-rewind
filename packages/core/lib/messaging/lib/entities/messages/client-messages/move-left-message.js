const MoveMessage = require('./move-message');

class MoveLeftMessage extends MoveMessage {
  static key = 'moveLeftMessage';
  static type = 10007;
}

module.exports = MoveLeftMessage;
