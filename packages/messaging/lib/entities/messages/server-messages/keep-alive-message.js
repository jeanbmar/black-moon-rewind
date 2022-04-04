const Message = require('../../message');

class KeepAliveMessage extends Message {
  static key = 'gateway.keepAlive';
  static type = 20010;
}

module.exports = KeepAliveMessage;
