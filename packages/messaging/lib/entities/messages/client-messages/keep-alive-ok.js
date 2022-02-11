const Message = require('../../message');

class KeepAliveOk extends Message {
  static type = 0x0a;
}

module.exports = KeepAliveOk;
