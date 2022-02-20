const { String } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class UnknownMessage extends Message {
  static key = 'unknownMessage';

  read(byteStream) {
    const payloadLength = this.header.length > 0 ? this.header.length - 18 : 0;
    if (payloadLength > 1000) {
      byteStream.skip(payloadLength);
      this.payload = 'payload too large';
    } else {
      this.payload = String.read(byteStream, {
        encoding: 'hex',
        length: payloadLength,
      });
    }
  }
}

module.exports = UnknownMessage;
