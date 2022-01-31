const {
    Int8,
    UInt8,
    UInt16BE,
    Int16BE,
    Int32BE,
    UInt32BE,
} = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class SpellList extends Message {
    static type = 0x3e;

    constructor() {
        super();
        this.spells = [{ a: 0x0A21 }];
    }

    write(byteStream) {
        UInt16BE.write(byteStream, this.mana ?? 0x20);
        UInt16BE.write(byteStream, this.maxMana ?? 0x20);
        UInt16BE.write(byteStream, this.spells.length);
        this.spells.forEach((spell) => {
            Int16BE.write(byteStream, spell.a ?? 0); //
            if (spell.a) {
                Int8.write(byteStream, spell.manaCost ?? 0x1a);
                Int16BE.write(byteStream, spell.c ?? 2);
                Int32BE.write(byteStream, spell.d ?? 0);
                Int16BE.write(byteStream, spell.e ?? 0);
                Int16BE.write(byteStream, spell.f ?? 0);
                UInt16BE.write(byteStream, spell.g ?? 1);
                Int32BE.write(byteStream, spell.h ?? 0x00068638);
                UInt32BE.write(byteStream, spell.i ?? 0x00019AE1);
                UInt8.write(byteStream, spell.j ?? 0x05);
                Int32BE.write(byteStream, spell.k ?? 0x00019AE0);
                UInt32BE.write(byteStream, spell.l ?? 0x05);
                // ago logs had an extra 00000000 00000000
            }
        });
    }
}

module.exports = SpellList;
