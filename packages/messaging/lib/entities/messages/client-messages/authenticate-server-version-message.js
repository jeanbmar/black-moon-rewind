const { Int32BE } = require('../../../types');
const Message = require('../../message');

class AuthenticateServerVersionMessage extends Message {
  static service = 'auth';
  static key = 'authenticateServerVersion';
  static type = 10099;

  read(byteStream) {
    this.clientVersion = Int32BE.read(byteStream);
  }
}

module.exports = AuthenticateServerVersionMessage;
