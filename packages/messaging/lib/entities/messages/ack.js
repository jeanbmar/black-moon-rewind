const Message = require('../message');

class Ack extends Message {
    static type = 0;
}

module.exports = Ack;
