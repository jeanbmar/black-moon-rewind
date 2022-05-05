const Message = require('../../message');

class ClientAckMessage extends Message {
  static service = 'gateway';
  static key = 'clientAck';
  static type = 10000;
}

module.exports = ClientAckMessage;
