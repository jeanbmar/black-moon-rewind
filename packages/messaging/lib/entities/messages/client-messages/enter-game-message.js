const Message = require('../../message');

class EnterGameMessage extends Message {
  static service = 'world';
  static key = 'enterGame';
  static type = 10046;
}

module.exports = EnterGameMessage;
