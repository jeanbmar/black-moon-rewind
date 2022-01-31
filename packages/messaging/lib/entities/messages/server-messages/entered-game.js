const { Int16BE, UInt16BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');
const Unit = require('../../unit');

class EnteredGame extends Message {
    static type = 0x2e;

    constructor() {
        super();
        this.units = [
            { a: 0x2c, b: 0x47, c: 2, d: {} },
            // { a: 0x31, b: 0x30, c: 0, d: {} },
            // { a: 0x36, b: 0x47, c: 2, d: {} },
            // { a: 0x34, b: 0x4a, c: 2, d: {} },
        ];
    }

    write(byteStream) {
        Int16BE.write(byteStream, this.units.length);
        this.units.forEach((unit) => {
            UInt16BE.write(byteStream, unit.a);
            UInt16BE.write(byteStream, unit.b);
            UInt16BE.write(byteStream, unit.c);
            Unit.write(byteStream, unit.d);
        });
    }
}

module.exports = EnteredGame;
