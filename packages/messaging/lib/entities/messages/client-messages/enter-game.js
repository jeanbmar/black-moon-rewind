const Message = require('../../message');

class EnterGame extends Message {
    static type = 0x2e;
}

module.exports = EnterGame;
