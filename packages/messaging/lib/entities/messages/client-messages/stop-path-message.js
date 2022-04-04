const Message = require('../../message');

class StopPathMessage extends Message {
  static key = 'world.stopPath';
  static type = 10156;
}

module.exports = StopPathMessage;
