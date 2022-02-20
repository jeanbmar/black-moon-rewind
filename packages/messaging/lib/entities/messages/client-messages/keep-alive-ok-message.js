const Message = require('../../message');

class KeepAliveOkMessage extends Message {
  static type = 10010;
}

module.exports = KeepAliveOkMessage;
