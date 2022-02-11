const Message = require('../../message');

class KeepAliveOkMessage extends Message {
  static type = 0x0a;
}

module.exports = KeepAliveOkMessage;
