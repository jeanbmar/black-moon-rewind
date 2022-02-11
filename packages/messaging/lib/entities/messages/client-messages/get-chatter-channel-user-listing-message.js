const { String } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class GetChatterChannelUserListingMessage extends Message {
  static type = 0x32;

  read(byteStream) {
    this.name = String.read(byteStream);
  }
}

module.exports = GetChatterChannelUserListingMessage;
