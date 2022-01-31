const Message = require('../../message');
const { UInt16BE, String } = require('@black-moon-rewind/byte-stream-scalars');

class JoinChatterChannels extends Message {
    static type = 0x30;

    constructor() {
        super();
        this.chatterChannels = [];
    }

    read(byteStream) {
        for (let i = UInt16BE.read(byteStream); i > 0; i -= 1) {
            this.chatterChannels.push({
                name: String.read(byteStream),
                b: String.read(byteStream),
            });
        }
    }
}

module.exports = JoinChatterChannels;
