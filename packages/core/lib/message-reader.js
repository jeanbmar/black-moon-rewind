const { Transform } = require('stream');
const { Buffer } = require('buffer');
const { MessageManager } = require('@black-moon-rewind/messaging');
const ByteStream = require('@black-moon-rewind/byte-stream');

class MessageReader extends Transform {
  constructor() {
    super({ objectMode: true });
    this.buffer = Buffer.alloc(0);
  }

  // eslint-disable-next-line no-underscore-dangle
  _transform(chunk, encoding, callback) {
    try {
      this.buffer = Buffer.concat([this.buffer, chunk]);
      while (this.buffer.length >= 12) {
        let messageLength = this.buffer.readUInt16LE(2);
        if (messageLength === 0) {
          messageLength = 12;
        }
        if (messageLength <= this.buffer.length) {
          const messageBuffer = this.buffer.slice(0, messageLength);
          this.buffer = this.buffer.slice(messageLength);
          const message = MessageManager.read(new ByteStream(messageBuffer));
          this.push(message);
        }
      }
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = MessageReader;
