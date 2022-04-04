const Message = require('../../message');

class StopPathMessage extends Message {
  static key = 'stopPathMessage';
  static type = 10156;
}

module.exports = StopPathMessage;
