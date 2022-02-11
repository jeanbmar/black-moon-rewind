const Message = require('../../message');

class ViewEquippedMessage extends Message {
  static type = 0x13;
}

module.exports = ViewEquippedMessage;
