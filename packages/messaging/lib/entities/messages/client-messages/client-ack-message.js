const Message = require('../../message');

class ClientAckMessage extends Message {
  static key = 'gateway.clientAck';
  static type = 10000;
}

module.exports = ClientAckMessage;
