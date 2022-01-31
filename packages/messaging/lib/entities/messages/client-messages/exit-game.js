const Message = require('../../message');

class ExitGame extends Message {
    static type = 0x14;
}

module.exports = ExitGame;
