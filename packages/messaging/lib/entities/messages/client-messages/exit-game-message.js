const Message = require('../../message');

class ExitGameMessage extends Message {
  static type = 10020;
}

module.exports = ExitGameMessage;
