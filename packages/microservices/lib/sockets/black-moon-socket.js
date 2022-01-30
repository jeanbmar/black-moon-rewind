const { Buffer } = require('buffer');
const ByteStream = require('@black-moon-rewind/byte-stream');
const { MessageManager } = require('@black-moon-rewind/messaging');
const TcpSocket = require('./tcp-socket');

class BlackMoonSocket extends TcpSocket {
    constructor(socket) {
        super(socket);
        this.buffer = Buffer.alloc(0);
    }

    handleSend(message, callback) {
        const bs = new ByteStream();
        MessageManager.write(bs, message);
        this.socket.write(bs.toBuffer());
    }

    handleData(data) {
        this.buffer = Buffer.concat([this.buffer, data]);
        let message;
        let byteStream = new ByteStream(this.buffer);
        while (message = MessageManager.read(byteStream)) {
            this.buffer = this.buffer.slice(byteStream.offset);
            this.emitMessage(message);
            byteStream = new ByteStream(this.buffer);
        }
    }
}

module.exports = BlackMoonSocket;
