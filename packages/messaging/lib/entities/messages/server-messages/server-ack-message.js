const Message = require('../../message');

class ServerAckMessage extends Message {
  static service = 'gateway';
  static key = 'serverAck';
  static type = 20000;
}

module.exports = ServerAckMessage;
