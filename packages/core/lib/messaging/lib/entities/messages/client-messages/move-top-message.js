const MoveMessage = require('./move-message');

class MoveTopMessage extends MoveMessage {
  static key = 'moveTopMessage';
  static type = 10001;
}

module.exports = MoveTopMessage;
