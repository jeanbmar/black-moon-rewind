const { String } = require('../../../types');
const Message = require('../../message');

class ChatterChannelTextMessage extends Message {
  static key = 'chat.chatterChannelText';
  static type = 20049;

  write(byteStream) {
    String.write(byteStream, this.channelName);
    String.write(byteStream, this.senderName);
    String.write(byteStream, this.text);
  }
}

module.exports = ChatterChannelTextMessage;
