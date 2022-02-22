const { Middleware } = require('@black-moon-rewind/game-js');
const { Buffer } = require('buffer');
const { Packet, MessageFactory } = require('@black-moon-rewind/messaging');
const ByteStream = require('@black-moon-rewind/byte-stream');

const INCOMING_PACKET_RADIX = 10000;

class PacketReader extends Middleware {
  constructor() {
    super();
    this.buffer = Buffer.alloc(0);
  }

  static getMessageKey(packetType) {
    const messageType = packetType + INCOMING_PACKET_RADIX;
    const messageClass = MessageFactory.getMessageByType(messageType);
    return messageClass.key;
  }

  transform(chunk) {
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
        this.push({
          type: PacketReader.getMessageKey(type),
          payload,
        });
      }
    }
  }
}

module.exports = () => new PacketReader();
