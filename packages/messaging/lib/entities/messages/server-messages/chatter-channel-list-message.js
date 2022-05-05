const { Int8, String, UInt16BE } = require('../../../types');
const Message = require('../../message');

class ChatterChannelListMessage extends Message {
  static service = 'chat';
  static key = 'chatterChannelList';
  static type = 20075;

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

module.exports = ChatterChannelListMessage;
