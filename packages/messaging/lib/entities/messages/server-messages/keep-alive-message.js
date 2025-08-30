const Message = require('../../message');

class KeepAliveMessage extends Message {
  static service = 'gateway';
  static key = 'keepAlive';
  static type = 20010;
}

module.exports = KeepAliveMessage;
