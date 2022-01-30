const { String } = require('@black-moon-rewind/byte-stream-scalars');
const Payload = require('./payload');

class UnknownPayload extends Payload {
    read(byteStream, { header }) {
        const length = header.length > 0 ? header.length - 18 : 0;
        if (length > 1000) {
            byteStream.skip(length);
            this.data = `payload of ${length} bytes is too large`;
        } else {
            this.data = String.read(byteStream, { encoding: 'hex', length });
        }
    }
}

module.exports = UnknownPayload;
