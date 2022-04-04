const Base = require('@reultra/byte-stream');

class ByteStream extends Base {
  readBuffer(options) {
    const length = options?.length ?? this.length;
    const value = this.toBuffer(this.offset, length);
    this.offset += length;
    return value;
  }

  writeBuffer(value) {
    this.ensureCapacity(value.length);
    value.copy(this.buffer, this.offset);
    this.offset += value.length;
  }

  readString() {
    const length = this.readUInt16BE();
    const value = this.buffer.toString(
      'utf8',
      this.offset,
      this.offset + length
    );
    this.offset += length;
    return value;
  }

  writeString(value) {
    const length = Buffer.byteLength(value, 'utf8');
    this.writeUInt16BE(length);
    this.ensureCapacity(length);
    this.buffer.write(value, this.offset, length, 'utf8');
    this.offset += length;
  }
}

module.exports = ByteStream;
