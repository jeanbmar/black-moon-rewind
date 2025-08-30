const { Int32BE } = require('../../../types');
const Message = require('../../message');

class ServerVersionMessage extends Message {
  static service = 'auth';
  static key = 'serverVersion';
  static type = 20099;

  write(byteStream) {
    Int32BE.write(byteStream, this.status ?? 1);
  }
}

module.exports = ServerVersionMessage;
