const { String } = require('../../../types');
const Message = require('../../message');

class GetChatterChannelUserListingMessage extends Message {
  static service = 'chat';
  static key = 'getChatterChannelUserListing';
  static type = 10050;

  read(byteStream) {
    this.name = String.read(byteStream);
  }
}

module.exports = GetChatterChannelUserListingMessage;
