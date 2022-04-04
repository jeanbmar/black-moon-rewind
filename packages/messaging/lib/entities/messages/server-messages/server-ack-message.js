const Message = require('../../message');

class ServerAckMessage extends Message {
  static key = 'gateway.serverAck';
  static type = 20000;
}

module.exports = ServerAckMessage;
