const Message = require('../../message');

class StopPathMessage extends Message {
  static service = 'world';
  static key = 'stopPath';
  static type = 10156;
}

module.exports = StopPathMessage;
