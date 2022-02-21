const { Transform } = require('stream');
const { Packet, MessageFactory } = require('@black-moon-rewind/messaging');
const ByteStream = require('@black-moon-rewind/byte-stream');

const OUTGOING_PACKET_RADIX = 20000;

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

  static getPacketType(key) {
    const messageClass = MessageFactory.getMessageByKey(key);
    return messageClass.type - OUTGOING_PACKET_RADIX;
  }

  _transform({ type, payload }, encoding, callback) {
    try {
      this.byteStream.reset();
      const packet = new Packet();
      packet.type = PacketWriter.getPacketType(type);
      packet.seq = this.nextSeq();
      packet.payload = payload;
      packet.write(this.byteStream);
      this.push(this.byteStream.toBuffer());
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = PacketWriter;
