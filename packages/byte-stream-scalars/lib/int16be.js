class Int16BE {
  static read(stream) {
    const value = stream.buffer.readInt16BE(stream.offset);
    stream.offset += 2;
    return value;
  }

  static write(stream, value) {
    stream.ensureCapacity(2);
    stream.buffer.writeInt16BE(value, stream.offset);
    stream.offset += 2;
  }
}

module.exports = Int16BE;
