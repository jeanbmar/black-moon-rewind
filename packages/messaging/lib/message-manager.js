const {
    UInt16LE,
    UInt32LE,
    Int32LE,
    UInt16BE,
} = require('@black-moon-rewind/byte-stream-scalars');
const MessageFactory = require('./message-factory');
const { Message } = require('./entities');

class MessageManager {
    static read(byteStream) {
        const header = {};
        header.mode = UInt16LE.read(byteStream);
        header.length = UInt16LE.read(byteStream);
        header.seq = UInt32LE.read(byteStream);
        header.crc = Int32LE.read(byteStream);
        header.nonce = header.length > 0 ? UInt16LE.read(byteStream) : 0;
        header.checksum = header.length > 0 ? UInt16LE.read(byteStream) : 0;
        header.type = header.length > 0 ? UInt16BE.read(byteStream) : 0;
        const message = MessageFactory.createMessageByType(header.type);
        message.header = header;
        if (header.length > 0) {
            message.read(byteStream);
        }
        if (!byteStream.isAtEnd()) {
            throw new Error('message length mismatch');
        }
        return message;
    }

    static write(byteStream, message) {
        const { offset } = byteStream;
        if (!message instanceof Message) {
            MessageFactory.createMessageByType(message.header.type).write.call(message, byteStream);
        } else {
            message.write(byteStream);
            message.header.type = message.constructor.type;
        }
        const payloadLength = byteStream.offset - offset;
        message.header.checksum = 0; // client doesn't care so why bother?
        message.header.length = payloadLength > 0 ? payloadLength + 18 : 0;
        if (payloadLength > 0) {
            byteStream.ensureCapacity(18);
            byteStream.buffer.copy(byteStream.buffer, offset + 18, offset, byteStream.offset);
            byteStream.offset = offset;
        }
        UInt16LE.write(byteStream, message.header.mode ?? 0);
        UInt16LE.write(byteStream, message.header.length);
        UInt32LE.write(byteStream, message.header.seq ?? 0);
        UInt32LE.write(byteStream, message.header.crc ?? 0);
        if (message.header.length > 0) {
            UInt16LE.write(byteStream, message.header.nonce ?? 0);
            UInt16LE.write(byteStream, message.header.checksum);
            UInt16BE.write(byteStream, message.header.type);
        }
        byteStream.offset += payloadLength;
    }
}

module.exports = MessageManager;
