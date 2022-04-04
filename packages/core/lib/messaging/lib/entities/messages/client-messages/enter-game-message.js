const Message = require('../../message');

class EnterGameMessage extends Message {
  static key = 'enterGameMessage';
  static type = 10046;
}

module.exports = EnterGameMessage;
