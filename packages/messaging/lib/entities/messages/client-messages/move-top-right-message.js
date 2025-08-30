const MoveMessage = require('./move-message');

class MoveTopRightMessage extends MoveMessage {
  static service = 'world';
  static key = 'moveTopRight';
  static type = 10002;
}

module.exports = MoveTopRightMessage;
