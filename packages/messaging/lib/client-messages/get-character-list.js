const { String, Int32BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../message');

class GetCharacterList extends Message {
    static type = 0x1a;

    read(byteStream) {}
}

module.exports = GetCharacterList;
