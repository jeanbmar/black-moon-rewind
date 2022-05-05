const MoveMessage = require('./move-message');

class MoveTopMessage extends MoveMessage {
  static service = 'world';
  static key = 'moveTop';
  static type = 10001;
}

module.exports = MoveTopMessage;
