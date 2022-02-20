const { Buffer } = require('buffer');

const DEFAULT_SIZE = 128;
const DEFAULT_FIXED_GROWTH_SIZE = 64;
const DEFAULT_DYNAMIC_GROWTH_FACTOR = 0.5;

class ByteStream {
  constructor(buffer, options = {}) {
    const {
      dynamic = false,
      growth = dynamic
        ? DEFAULT_DYNAMIC_GROWTH_FACTOR
        : DEFAULT_FIXED_GROWTH_SIZE,
      defaultSize = DEFAULT_SIZE,
    } = options;
    this.dynamic = dynamic;
    this.growth = growth;
    this._offset = 0;
    if (buffer) {
      this.buffer = buffer;
      this.byteLength = buffer.length;
    } else {
      this.buffer = Buffer.allocUnsafe(defaultSize);
      this.byteLength = 0;
    }
  }

  set offset(value) {
    if (value > this.byteLength) {
      this.byteLength = value;
    }
    this._offset = value;
  }

  get offset() {
    return this._offset;
  }

  reset() {
    this.offset = 0;
    this.byteLength = 0;
  }

  skip(offset) {
    this.offset += offset;
  }

  toBuffer(start = 0, end = this.byteLength) {
    return this.buffer.slice(start, end);
  }

  get capacity() {
    return this.buffer.length;
  }

  ensureCapacity(size) {
    const overflow = this._offset + size - this.capacity;
    if (overflow > 0) {
      const growth = this.dynamic
        ? Math.ceil(this.capacity * this.growth)
        : this.growth;
      this.buffer = Buffer.concat([
        this.buffer,
        Buffer.allocUnsafe(Math.max(overflow, growth)),
      ]);
    }
  }

  isAtEnd() {
    return this.byteLength === this._offset;
  }
}

module.exports = ByteStream;
