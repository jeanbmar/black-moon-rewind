class UInt64BE {
  static read(stream) {
    const value = stream.buffer.readBigUInt64BE(stream.offset);
    stream.offset += 8;
    return Number(value);
  }

  static write(stream, value) {
    stream.ensureCapacity(8);
    stream.buffer.writeBigUInt64BE(BigInt(value), stream.offset);
    stream.offset += 8;
  }
}

module.exports = UInt64BE;
