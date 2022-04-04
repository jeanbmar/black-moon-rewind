const Message = require('../../message');

class ExitGameMessage extends Message {
  static key = 'auth.exitGame';
  static type = 10020;
}

module.exports = ExitGameMessage;
