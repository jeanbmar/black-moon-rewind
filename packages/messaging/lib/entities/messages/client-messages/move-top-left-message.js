const MoveMessage = require('./move-message');

class MoveTopLeftMessage extends MoveMessage {
  static service = 'world';
  static key = 'moveTopLeft';
  static type = 10008;
}

module.exports = MoveTopLeftMessage;
