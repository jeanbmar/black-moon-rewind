const { Transform } = require('stream');
const { Packet } = require('@black-moon-rewind/messaging');
const ByteStream = require('@black-moon-rewind/byte-stream');

class PacketWriter extends Transform {
  constructor() {
    super({ objectMode: true });
    this.byteStream = new ByteStream();
    this.seq = 0;
  }

  nextSeq() {
    const { seq } = this;
    this.seq += 1;
    return seq;
  }

  _transform(brokerMessage, encoding, callback) {
    try {
      this.byteStream.reset();
      const packet = new Packet();
      packet.type = parseInt(brokerMessage.type, 10);
      packet.seq = this.nextSeq();
      packet.payload = brokerMessage.payload;
      packet.write(this.byteStream);
      this.push(this.byteStream.toBuffer());
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = PacketWriter;
