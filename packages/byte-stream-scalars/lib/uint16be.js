class UInt16BE {
  static read(stream) {
    const value = stream.buffer.readUInt16BE(stream.offset);
    stream.offset += 2;
    return value;
  }

  static write(stream, value) {
    stream.ensureCapacity(2);
    stream.buffer.writeUInt16BE(value, stream.offset);
    stream.offset += 2;
  }
}

module.exports = UInt16BE;
