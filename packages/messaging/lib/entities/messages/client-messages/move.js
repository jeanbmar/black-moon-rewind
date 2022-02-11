const { UInt8 } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class Move extends Message {
  read(byteStream) {
    this.distance = UInt8.read(byteStream);
  }
}

module.exports = Move;
