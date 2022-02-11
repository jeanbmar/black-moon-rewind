const { Int32BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class GetLagMessage extends Message {
  static type = 0x9a;

  read(byteStream) {
    Int32BE.write(byteStream, this.a);
    Int32BE.write(byteStream, this.b);
  }
}

module.exports = GetLagMessage;
