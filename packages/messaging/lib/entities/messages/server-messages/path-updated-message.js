const { UInt16BE, Int32BE, UInt8 } = require('../../../types');
const Message = require('../../message');
const Unit = require('../../unit');

class PathUpdatedMessage extends Message {
  static service = 'world';
  static key = 'pathUpdated';
  static type = 20153;

  constructor() {
    super();
    this.path = [];
  }

  write(byteStream) {
    UInt16BE.write(byteStream, this.x);
    UInt16BE.write(byteStream, this.y);
    Unit.write(byteStream, this.unit ?? {});
    Int32BE.write(byteStream, this.delay ?? 0);
    UInt16BE.write(byteStream, this.x2);
    UInt16BE.write(byteStream, this.y2);
    const even = this.path.length % 2 === 0;
    const encodedPathLength = (this.path.length + (even ? 0 : 1)) / 2;
    UInt16BE.write(byteStream, encodedPathLength);
    for (let i = 0; i < encodedPathLength; i += 1) {
      // eslint-disable-next-line no-bitwise
      const lo = this.path[i * 2] & 0x0f;
      // eslint-disable-next-line no-bitwise
      const hi = (this.path[i * 2 + 1] ?? 0x0f) & 0x0f;
      // eslint-disable-next-line no-bitwise
      UInt8.write(byteStream, lo | (hi << 4));
    }
  }
}

module.exports = PathUpdatedMessage;
