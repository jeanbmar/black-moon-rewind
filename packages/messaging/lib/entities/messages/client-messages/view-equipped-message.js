const Message = require('../../message');

class ViewEquippedMessage extends Message {
  static service = 'world';
  static key = 'viewEquipped';
  static type = 10019;
}

module.exports = ViewEquippedMessage;
