const Message = require('../../message');

class KeepAliveOkMessage extends Message {
  static key = 'gateway.keepAliveOk';
  static type = 10010;
}

module.exports = KeepAliveOkMessage;
