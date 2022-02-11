const { String, Int32BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class ChatterChannelJoined extends Message {
  static type = 0x30;

  write(byteStream) {
    Int32BE.write(byteStream, this.a ?? 100);
    String.write(byteStream, this.name);
  }
}

module.exports = ChatterChannelJoined;
