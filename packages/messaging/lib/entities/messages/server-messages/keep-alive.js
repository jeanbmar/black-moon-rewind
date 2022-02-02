const Message = require('../../message');

class KeepAlive extends Message {
    static type = 0x0a;
}

module.exports = KeepAlive;
