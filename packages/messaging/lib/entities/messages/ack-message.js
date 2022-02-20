const Message = require('../message');

class AckMessage extends Message {
  static type = 20000;
}

module.exports = AckMessage;
