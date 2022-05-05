const Message = require('../../message');

class ExitGameMessage extends Message {
  static service = 'auth';
  static key = 'exitGame';
  static type = 10020;
}

module.exports = ExitGameMessage;
