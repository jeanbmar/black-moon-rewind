const {
    UInt16LE,
    UInt32LE,
    Int32LE,
    UInt16BE,
} = require('@black-moon-rewind/byte-stream-scalars');
const Entity = require('./entity');

class Header extends Entity {
    constructor() {
        super();
    }

    static peekLength(byteStream) {
        byteStream.offset += 2;
        const length = UInt16LE.read(byteStream);
        byteStream.offset -= 4;
        return length;
    }

    read(byteStream) {
        this.mode = UInt16LE.read(byteStream);
        this.length = UInt16LE.read(byteStream);
        this.seq = UInt32LE.read(byteStream);
        this.crc = Int32LE.read(byteStream);
        if (this.length > 0) {
            this.nonce = UInt16LE.read(byteStream);
            this.checksum = UInt16LE.read(byteStream);
            this.type = UInt16BE.read(byteStream);
        }
    }

    write(byteStream) {
        UInt16LE.write(byteStream, this.mode ?? 0);
        UInt16LE.write(byteStream, this.length);
        UInt32LE.write(byteStream, this.seq ?? 0);
        UInt32LE.write(byteStream, this.crc ?? 0);
        if (this.length > 0) {
            UInt16LE.write(byteStream, this.nonce ?? 0);
            UInt16LE.write(byteStream, this.checksum);
            UInt16BE.write(byteStream, this.type);
        }
    }
}

module.exports = Header;
