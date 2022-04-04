const { Int32BE } = require('../../../types');
const Message = require('../../message');

class AuthenticateServerVersionMessage extends Message {
  static key = 'auth.authenticateServerVersion';
  static type = 10099;

  read(byteStream) {
    this.clientVersion = Int32BE.read(byteStream);
  }
}

module.exports = AuthenticateServerVersionMessage;
