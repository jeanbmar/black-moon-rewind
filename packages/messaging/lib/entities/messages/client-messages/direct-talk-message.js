const {
  UInt8,
  Int32BE,
  UInt16BE,
} = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class DirectTalkMessage extends Message {
  static key = 'directTalkMessage';
  static type = 10030;

  read(byteStream) {
    this.x = UInt16BE.read(byteStream);
    this.y = UInt16BE.read(byteStream);
    this.c = Int32BE.read(byteStream);
    this.d = UInt8.read(byteStream);
    if (this.d !== 1) {
      this.e = Int32BE.read(byteStream);
      this.f = Int32BE.read(byteStream);
      this.g = Int32BE.read(byteStream);
      this.h = Int32BE.read(byteStream);
      this.i = Int32BE.read(byteStream);
    }
  }
}

module.exports = DirectTalkMessage;
