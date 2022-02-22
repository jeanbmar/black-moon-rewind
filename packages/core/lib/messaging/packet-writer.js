const { Middleware } = require('@black-moon-rewind/game-js');
const { Packet, MessageFactory } = require('@black-moon-rewind/messaging');
const ByteStream = require('@black-moon-rewind/byte-stream');

const OUTGOING_PACKET_RADIX = 20000;

class PacketWriter extends Middleware {
  constructor() {
    super();
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

  transform({ type, payload }) {
    this.byteStream.reset();
    const packet = new Packet();
    packet.type = PacketWriter.getPacketType(type);
    packet.seq = this.nextSeq();
    packet.payload = payload;
    packet.write(this.byteStream);
    return this.byteStream.toBuffer();
  }
}

module.exports = () => new PacketWriter();
