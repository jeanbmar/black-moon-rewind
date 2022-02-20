const { Int16BE, UInt16BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');
const Unit = require('../../unit');

class EnteredGameMessage extends Message {
  static type = 20046;

  constructor() {
    super();
    this.entities = [
      // { x: 0x2c, y: 0x47, c: 2, unit: {} },
      // { a: 0x31, b: 0x30, c: 0, d: {} },
      // { a: 0x36, b: 0x47, c: 2, d: {} },
      // { a: 0x34, b: 0x4a, c: 2, d: {} },
    ];
  }

  write(byteStream) {
    Int16BE.write(byteStream, this.entities.length);
    this.entities.forEach((entity) => {
      UInt16BE.write(byteStream, entity.x);
      UInt16BE.write(byteStream, entity.y);
      UInt16BE.write(byteStream, entity.c ?? 2);
      Unit.write(byteStream, entity.unit);
    });
  }
}

module.exports = EnteredGameMessage;
