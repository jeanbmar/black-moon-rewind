class Int8 {
  static read(stream) {
    const value = stream.buffer.readInt8(stream.offset);
    stream.offset += 1;
    return value;
  }

  static write(stream, value) {
    stream.ensureCapacity(1);
    stream.buffer.writeInt8(value, stream.offset);
    stream.offset += 1;
  }
}

module.exports = Int8;
