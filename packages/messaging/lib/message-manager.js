const Header = require('./header');
const Payload = require('./payload');
const PayloadFactory = require('./payload-factory');
const Message = require('./message');
const Ack = require('./ack');

class MessageManager {
    static read(byteStream) {
        if (
            byteStream.byteLength < 12
            || byteStream.byteLength < Header.peekLength(byteStream)
        ) {
            return null;
        }
        const header = Header.read(byteStream);
        let payload;
        if (header.length === 0) {
            payload = Ack.read(byteStream);
        } else {
            payload = PayloadFactory.getPayloadByType(header.type).read(byteStream);
        }
        const message = new Message();
        message.header = header;
        message.payload = payload;
        return message;
    }

    static write(byteStream, payloadLike, headerLike) {
        const { offset } = byteStream;
        if (!payloadLike instanceof Payload) {
            PayloadFactory.getPayloadByType(headerLike.type).prototype.write.call(payloadLike, byteStream);
        } else {
            payloadLike.write(byteStream);
        }
        const payloadLength = byteStream.offset - offset;
        let checksum = 0;
        for (let i = offset; i < byteStream.offset; i += 1) {
            checksum += byteStream.buffer[i];
        }
        const header = {
            ...headerLike,
            checksum,
            length: payloadLength > 0 ? payloadLength + 18 : 0,
            type: payloadLike instanceof Payload ? payloadLike.constructor.type : headerLike.type,
        };
        if (payloadLength > 0) {
            byteStream.ensureCapacity(18);
            byteStream.buffer.copy(byteStream.buffer, offset + 18, offset, byteStream.offset);
            byteStream.offset = offset;
        }
        Header.prototype.write.call(header, byteStream);
        byteStream.offset += payloadLength;
    }
}

module.exports = MessageManager;
