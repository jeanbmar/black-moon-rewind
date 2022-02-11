class UInt64LE {
  static read(stream) {
    const value = stream.buffer.readBigUInt64LE(stream.offset);
    stream.offset += 8;
    return Number(value);
  }

  static write(stream, value) {
    stream.ensureCapacity(8);
    stream.buffer.writeBigUInt64LE(BigInt(value), stream.offset);
    stream.offset += 8;
  }
}

module.exports = UInt64LE;
