const { String, Int32BE } = require('../../../types');
const Message = require('../../message');

class ChatterChannelJoinedMessage extends Message {
  static service = 'chat';
  static key = 'chatterChannelJoined';
  static type = 20048;

  write(byteStream) {
    Int32BE.write(byteStream, this.a ?? 100);
    String.write(byteStream, this.name);
  }
}

module.exports = ChatterChannelJoinedMessage;
