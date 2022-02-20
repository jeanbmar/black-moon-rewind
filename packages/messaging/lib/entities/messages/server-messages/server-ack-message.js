const Message = require('../../message');

class ServerAckMessage extends Message {
  static type = 20000;
}

module.exports = ServerAckMessage;
