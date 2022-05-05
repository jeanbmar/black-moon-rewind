const { Int32BE } = require('../../../types');
const Message = require('../../message');

class GetLagMessage extends Message {
  static service = 'gateway';
  static key = 'getLag';
  static type = 20154;

  read(byteStream) {
    Int32BE.write(byteStream, this.a);
    Int32BE.write(byteStream, this.b);
  }
}

module.exports = GetLagMessage;
