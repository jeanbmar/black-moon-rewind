const { UInt16BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');
const Unit = require('../../unit');

class EntityMovedMessage extends Message {
  static type = 20001;

  write(byteStream) {
    UInt16BE.write(byteStream, this.x);
    UInt16BE.write(byteStream, this.y);
    Unit.write(byteStream, this.unit ?? {});
  }
}

module.exports = EntityMovedMessage;
