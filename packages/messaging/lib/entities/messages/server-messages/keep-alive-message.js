const Message = require('../../message');

class KeepAliveMessage extends Message {
  static type = 0x0a;
}

module.exports = KeepAliveMessage;
