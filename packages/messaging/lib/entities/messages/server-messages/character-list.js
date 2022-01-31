const { UInt8, String, UInt16BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class CharacterList extends Message {
    static type = 0x1a;

    constructor() {
        super();
        this.characters = [];
    }

    write(byteStream) {
        UInt8.write(byteStream, this.characters.length);
        this.characters.forEach((character) => {
            String.write(byteStream, character.name);
            UInt16BE.write(byteStream, character.level);
        });
    }
}

module.exports = CharacterList;
