const UInt16BE = require('./uint16be');

class String {
  static read(stream, options = {}) {
    const { encoding = 'utf8', length = UInt16BE } = options;
    const lengthValue =
      typeof length === 'number' ? length : length.read(stream, options);
    if (lengthValue < 0) {
      return null;
    }
    const value = stream.buffer.toString(
      encoding,
      stream.offset,
      stream.offset + lengthValue
    );
    stream.offset += lengthValue;
    return value;
  }

  static write(stream, value, options = {}) {
    const { encoding = 'utf8', length = UInt16BE } = options;
    let lengthValue;
    if (typeof length === 'number') {
      lengthValue = length;
    } else if (value === null) {
      length.write(stream, -1, options);
      return;
    } else {
      lengthValue = Buffer.byteLength(value, encoding);
      length.write(stream, lengthValue, options);
    }
    stream.ensureCapacity(lengthValue);
    stream.buffer.write(value, stream.offset, lengthValue, encoding);
    stream.offset += lengthValue;
  }
}

module.exports = String;
