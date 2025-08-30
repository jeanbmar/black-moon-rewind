const { String } = require('../../../types');
const Message = require('../../message');

class SendChatterChannelTextMessage extends Message {
  static service = 'chat';
  static key = 'sendChatterChannelText';
  static type = 10049;

  read(byteStream) {
    this.channelName = String.read(byteStream);
    this.text = String.read(byteStream);
  }
}

module.exports = SendChatterChannelTextMessage;
