const Message = require('../../message');

class ViewEquippedMessage extends Message {
  static key = 'viewEquippedMessage';
  static type = 10019;
}

module.exports = ViewEquippedMessage;
