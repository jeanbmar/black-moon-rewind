const Message = require('../../message');

class KeepAliveOkMessage extends Message {
  static key = 'keepAliveOkMessage';
  static type = 10010;
}

module.exports = KeepAliveOkMessage;
