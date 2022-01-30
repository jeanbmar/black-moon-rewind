const crypto = require('crypto');
const { UInt8, UInt16BE, UInt32BE, String } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../message');

class CharacterData extends Message {
    static type = 0x0d;

    write(byteStream) {
        UInt8.write(byteStream, 0);
        UInt32BE.write(byteStream, this.characterId ?? crypto.randomInt(1, 0xFFFF));
        UInt16BE.write(byteStream, this.x ?? 0x34);
        UInt16BE.write(byteStream, this.y ?? 0x4a);
        UInt16BE.write(byteStream, this.z ?? 0x93);
        UInt32BE.write(byteStream, this.health ?? 0x32);
        UInt32BE.write(byteStream, this.maxHealth ?? 0x32);
        UInt32BE.write(byteStream, this.mana ?? 0x32);
        UInt16BE.write(byteStream, 0x20);
        UInt16BE.write(byteStream, 0x20);
        UInt16BE.write(byteStream, 0x20);
        UInt16BE.write(byteStream, this.level ?? 2);
        UInt32BE.write(byteStream, 0);
        UInt32BE.write(byteStream, 0);
        UInt32BE.write(byteStream, 0);
        String.write(byteStream, '00000082000000000000000000090009003200320028000A000A000A003200320028000A000A000A000C000A000C000C000A000C000A001000FA000000200000000100000003000A000A000000000006AE900103000300017EBFFF0003110A00000216E80100143C3C1807040C002910050009000007D100AF0000', { length: 123, encoding: 'hex' });
    }
}

module.exports = CharacterData;
