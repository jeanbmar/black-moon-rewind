const { Int32BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class GetLagOk extends Message {
  static type = 0x9a;

  read(byteStream) {
    this.a = Int32BE.read(byteStream);
  }
}

module.exports = GetLagOk;
