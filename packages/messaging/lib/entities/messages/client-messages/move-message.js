const { UInt8 } = require('../../../types');
const Message = require('../../message');

class MoveMessage extends Message {
  read(byteStream) {
    this.distance = UInt8.read(byteStream);
  }
}

module.exports = MoveMessage;
