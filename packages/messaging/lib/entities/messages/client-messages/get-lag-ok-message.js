const { Int32BE } = require('../../../types');
const Message = require('../../message');

class GetLagOkMessage extends Message {
  static key = 'gateway.getLagOk';
  static type = 10154;

  read(byteStream) {
    this.a = Int32BE.read(byteStream);
  }
}

module.exports = GetLagOkMessage;
