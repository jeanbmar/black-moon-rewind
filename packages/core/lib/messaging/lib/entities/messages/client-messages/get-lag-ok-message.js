const { Int32BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class GetLagOkMessage extends Message {
  static key = 'getLagOkMessage';
  static type = 10154;

  read(byteStream) {
    this.a = Int32BE.read(byteStream);
  }
}

module.exports = GetLagOkMessage;
