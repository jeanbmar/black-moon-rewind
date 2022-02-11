class Int32LE {
  static read(stream) {
    const value = stream.buffer.readInt32LE(stream.offset);
    stream.offset += 4;
    return value;
  }

  static write(stream, value) {
    stream.ensureCapacity(4);
    stream.buffer.writeInt32LE(value, stream.offset);
    stream.offset += 4;
  }
}

module.exports = Int32LE;
