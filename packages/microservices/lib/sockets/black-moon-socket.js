const { Buffer } = require('buffer');
const ByteStream = require('@black-moon-rewind/byte-stream');
const { MessageManager } = require('@black-moon-rewind/messaging');
const { Socket } = require('net');

class BlackMoonSocket extends Socket {
    constructor(socket) {
        super({ handle: socket._handle });
        this.buffer = Buffer.alloc(0);
        this.seq = 0;
        this.on('data', this.onData.bind(this));
    }

    send(message, callback) {
        const bs = new ByteStream();
        message.header.seq = this.seq;
        this.seq += 1;
        MessageManager.write(bs, message);
        this.write(bs.toBuffer(), callback);
    }

    onData(data) {
        this.buffer = Buffer.concat([this.buffer, data]);
        while (this.buffer.length >= 12) {
            let messageLength = this.buffer.readUInt16LE(2);
            if (messageLength === 0) {
                messageLength = 12;
            }
            if (messageLength <= this.buffer.length) {
                const messageBuffer = this.buffer.slice(0, messageLength);
                this.buffer = this.buffer.slice(messageLength);
                const message = MessageManager.read(new ByteStream(messageBuffer));
                this.emit('message', message);
            }
        }
    }
}

module.exports = BlackMoonSocket;
