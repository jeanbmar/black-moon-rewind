const Message = require('../../message');

class KeepAliveMessage extends Message {
  static key = 'keepAliveMessage';
  static type = 20010;
}

module.exports = KeepAliveMessage;
