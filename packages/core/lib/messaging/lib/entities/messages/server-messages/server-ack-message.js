const Message = require('../../message');

class ServerAckMessage extends Message {
  static key = 'serverAckMessage';
  static type = 20000;
}

module.exports = ServerAckMessage;
