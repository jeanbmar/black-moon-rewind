const Message = require('../../message');

class GetCharacterList extends Message {
    static type = 0x1a;
}

module.exports = GetCharacterList;
