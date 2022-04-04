const { UInt16BE, String } = require('../../../types');
const Message = require('../../message');

class JoinChatterChannelsMessage extends Message {
  static key = 'chat.joinChatterChannels';
  static type = 10048;

  constructor() {
    super();
    this.channels = [];
  }

  read(byteStream) {
    for (let i = UInt16BE.read(byteStream); i > 0; i -= 1) {
      this.channels.push({
        name: String.read(byteStream),
        password: String.read(byteStream),
      });
    }
  }
}

module.exports = JoinChatterChannelsMessage;
