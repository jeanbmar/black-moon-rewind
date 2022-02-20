const { Transform } = require('stream');
const { Buffer } = require('buffer');
const { Packet } = require('@black-moon-rewind/messaging');
const ByteStream = require('@black-moon-rewind/byte-stream');

class PacketReader extends Transform {
  constructor() {
    super({ objectMode: true });
    this.buffer = Buffer.alloc(0);
  }

  // eslint-disable-next-line no-underscore-dangle
  _transform(chunk, encoding, callback) {
    try {
      this.buffer = Buffer.concat([this.buffer, chunk]);
      while (this.buffer.length >= 12) {
        let packetLength = this.buffer.readUInt16LE(2);
        if (packetLength === 0) {
          packetLength = 12;
        }
        if (packetLength <= this.buffer.length) {
          const byteStream = new ByteStream(this.buffer.slice(0, packetLength));
          this.buffer = this.buffer.slice(packetLength);
          const { type, payload } = Packet.read(byteStream);
          this.push({ type: `${type}`, payload });
        }
      }
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = PacketReader;
