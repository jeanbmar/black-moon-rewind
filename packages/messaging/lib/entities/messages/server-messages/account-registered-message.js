const { String, UInt8 } = require('../../../types');
const Message = require('../../message');

class AccountRegisteredMessage extends Message {
  static key = 'auth.accountRegistered';
  static type = 20014;

  write(byteStream) {
    UInt8.write(byteStream, this.flag ?? 0);
    String.write(
      byteStream,
      this.message ?? 'Welcome to the Black Moon Chronicles!'
    );
  }
}

module.exports = AccountRegisteredMessage;
