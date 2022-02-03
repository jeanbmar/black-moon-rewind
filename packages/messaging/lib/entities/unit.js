const {
    Int32BE,
    UInt16BE,
    UInt8,
    Int8,
} = require('@black-moon-rewind/byte-stream-scalars');
const Entity = require('../entity');

/*
000016E7 00 00 00100009 02 00 02 64 00C8 00
0000683C 00 00 0010000A 03 00 02 64 00C8 00
000016E7 00 00 0010000B 02 00 02 64 00C8 00
0006AE90 01 03 000000AE 03 00 01 64 0002 00
*/

class Unit extends Entity {
    write(byteStream) {
        Int32BE.write(byteStream, this.a ?? 0x000016E7);
        Int8.write(byteStream, this.b ?? 0);
        Int8.write(byteStream, this.c ?? 0);
        Int32BE.write(byteStream, this.id);
        Int8.write(byteStream, this.e ?? 2);
        UInt8.write(byteStream, this.f ?? 0);
        UInt8.write(byteStream, this.g ?? 2);
        UInt8.write(byteStream, this.h ?? 64);
        UInt16BE.write(byteStream, this.i ?? 0xc8);
        Int8.write(byteStream, this.j ?? 0);
    }
}

module.exports = Unit;
