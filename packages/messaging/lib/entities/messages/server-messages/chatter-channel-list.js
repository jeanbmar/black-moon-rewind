const {
  Int8,
  String,
  UInt16BE,
} = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class ChatterChannelList extends Message {
  static type = 0x4b;

  constructor() {
    super();
    this.channels = [];
  }

  write(byteStream) {
    UInt16BE.write(byteStream, this.channels.length);
    this.channels.forEach((channel) => {
      String.write(byteStream, channel.name);
      UInt16BE.write(byteStream, channel.online);
      Int8.write(byteStream, channel.status);
    });
  }
}

module.exports = ChatterChannelList;
