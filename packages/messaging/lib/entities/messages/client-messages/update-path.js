const { UInt16BE, UInt8 } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class UpdatePath extends Message {
    static type = 0x99;

    constructor() {
        super();
        this.path = [];
    }

    read(byteStream) {
        this.x = UInt16BE.read(byteStream);
        this.y = UInt16BE.read(byteStream);
        for (let i = UInt16BE.read(byteStream); i > 0; i -= 1) {
            const packed = UInt8.read(byteStream);
            this.path.push(packed & 0x0F);
            const move2 = (packed & 0xF0) >> 4;
            if (move2 !== 0x0F) {
                this.path.push(move2);
            }
        }
    }
}

module.exports = UpdatePath;
