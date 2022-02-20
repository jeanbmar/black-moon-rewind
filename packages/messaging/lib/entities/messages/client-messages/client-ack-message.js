const Message = require('../../message');

class ClientAckMessage extends Message {
  static type = 10000;
}

module.exports = ClientAckMessage;
