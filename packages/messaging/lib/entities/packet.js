const { Buffer, UInt16LE, UInt32LE, Int32LE, UInt16BE } = require('../types');
const Entity = require('../entity');

class Packet extends Entity {
  read(byteStream) {
    this.mode = UInt16LE.read(byteStream);
    this.length = UInt16LE.read(byteStream);
    this.seq = UInt32LE.read(byteStream);
    this.crc = Int32LE.read(byteStream);
    this.nonce = this.length > 0 ? UInt16LE.read(byteStream) : 0;
    this.checksum = this.length > 0 ? UInt16LE.read(byteStream) : 0;
    this.type = this.length > 0 ? UInt16BE.read(byteStream) : 0;
    this.payload = Buffer.read(byteStream);
  }

  write(byteStream) {
    const packetLength = this.type !== 0 ? this.payload.length + 18 : 0;
    UInt16LE.write(byteStream, this.mode ?? 0);
    UInt16LE.write(byteStream, packetLength);
    UInt32LE.write(byteStream, this.seq ?? 0);
    UInt32LE.write(byteStream, this.crc ?? 0);
    if (packetLength > 0) {
      UInt16LE.write(byteStream, this.nonce ?? 0);
      UInt16LE.write(byteStream, this.checksum ?? 0);
      UInt16BE.write(byteStream, this.type);
    }
    if (this.type !== 0) {
      Buffer.write(byteStream, this.payload);
    }
  }
}

module.exports = Packet;
