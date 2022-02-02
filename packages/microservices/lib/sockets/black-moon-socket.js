const { Buffer } = require('buffer');
const ByteStream = require('@black-moon-rewind/byte-stream');
const { MessageManager, KeepAlive } = require('@black-moon-rewind/messaging');
const { Socket } = require('net');

class BlackMoonSocket extends Socket {
    constructor(options) {
        super(options);
        this.buffer = Buffer.alloc(0);
        this.seq = 0;
        this.keepAliveCount = 0;
        this.on('data', this.onData.bind(this));
        this.on('timeout', this.onTimeout.bind(this));
    }

    send(message, callback) {
        const bs = new ByteStream();
        message.header.seq = this.seq;
        this.seq += 1;
        MessageManager.write(bs, message);
        this.write(bs.toBuffer(), callback);
    }

    onData(data) {
        this.keepAliveCount = 0;
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

    onTimeout() {
        if (this.keepAliveCount >= 3) {
            this.destroy(new Error('connection timeout'));
        }
        this.send(new KeepAlive());
        this.keepAliveCount += 1;
    }
}

module.exports = BlackMoonSocket;
