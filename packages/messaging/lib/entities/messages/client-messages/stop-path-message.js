const Message = require('../../message');

class StopPathMessage extends Message {
  static type = 0x9c;
}

module.exports = StopPathMessage;
