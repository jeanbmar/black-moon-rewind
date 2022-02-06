const Message = require('../../message');

class StopPath extends Message {
    static type = 0x9c;
}

module.exports = StopPath;
