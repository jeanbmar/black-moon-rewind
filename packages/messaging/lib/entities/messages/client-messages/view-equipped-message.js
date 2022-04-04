const Message = require('../../message');

class ViewEquippedMessage extends Message {
  static key = 'world.viewEquipped';
  static type = 10019;
}

module.exports = ViewEquippedMessage;
