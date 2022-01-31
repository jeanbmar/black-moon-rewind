const Message = require('../../message');

class GetSpellList extends Message {
    static type = 0x3e;
}

module.exports = GetSpellList;
