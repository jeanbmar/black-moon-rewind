const Message = require('../../message');

class EnterGameMessage extends Message {
  static key = 'world.enterGame';
  static type = 10046;
}

module.exports = EnterGameMessage;
