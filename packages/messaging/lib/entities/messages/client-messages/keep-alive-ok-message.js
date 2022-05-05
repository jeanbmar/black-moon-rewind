const Message = require('../../message');

class KeepAliveOkMessage extends Message {
  static service = 'gateway';
  static key = 'keepAliveOk';
  static type = 10010;
}

module.exports = KeepAliveOkMessage;
