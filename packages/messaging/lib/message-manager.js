const {
    UInt16LE,
    UInt32LE,
    Int32LE,
    UInt16BE,
} = require('@black-moon-rewind/byte-stream-scalars');
const MessageFactory = require('./message-factory');
const Message = require('./message');

class MessageManager {
    static peekMessageLength(byteStream) {
        byteStream.offset += 2;
        const length = UInt16LE.read(byteStream);
        byteStream.offset -= 4;
        return length;
    }

    static read(byteStream) {
        if (byteStream.byteLength < 12) {
            return null;
        }
        const messageLength = this.peekMessageLength(byteStream);
        if (byteStream.byteLength < messageLength) {
            return null;
        }
        const header = {};
        header.mode = UInt16LE.read(byteStream);
        header.length = messageLength;
        byteStream.skip(2);
        header.seq = UInt32LE.read(byteStream);
        header.crc = Int32LE.read(byteStream);
        header.nonce = messageLength > 0 ? UInt16LE.read(byteStream) : 0;
        header.checksum = messageLength > 0 ? UInt16LE.read(byteStream) : 0;
        header.type = messageLength > 0 ? UInt16BE.read(byteStream) : 0;
        const message = MessageFactory.createMessageByType(header.type);
        message.header = header;
        if (messageLength > 0) {
            const { offset: start } = byteStream;
            message.read(byteStream);
            if (byteStream.offset - start !== messageLength - 18) {
                throw new Error('message length mismatch');
            }
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
