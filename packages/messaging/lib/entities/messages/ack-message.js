const Message = require('../message');

class AckMessage extends Message {
  static type = 0;
}

module.exports = AckMessage;
