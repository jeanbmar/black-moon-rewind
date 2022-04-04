class Buffer {
  static read(stream, options = {}) {
    const { length = stream.byteLength } = options;
    const value = stream.toBuffer(stream.offset, length);
    stream.offset += length;
    return value;
  }

  static write(stream, value) {
    stream.ensureCapacity(value.length);
    value.copy(stream.buffer, stream.offset);
    stream.offset += value.length;
  }
}

module.exports = Buffer;
