const { Int8, UInt8, UInt16BE, Int32BE } = require('../../../types');
const Message = require('../../message');

const SLOTS = 10;

class EquipmentDataMessage extends Message {
  static service = 'world';
  static key = 'equipmentData';
  static type = 20019;

  constructor() {
    super();
    this.items = [];
  }

  write(byteStream) {
    UInt8.write(byteStream, this.a ?? 2);
    for (let i = 0; i < SLOTS; i += 1) {
      const item = this.items[i];
      if (item) {
        Int32BE.write(byteStream, item.id);
        Int32BE.write(byteStream, item.b ?? 0x00017ebf);
        Int8.write(byteStream, item.c ?? -1);
        UInt16BE.write(byteStream, item.d ?? 0x01);
        UInt16BE.write(byteStream, item.e ?? 0x4f41);
        Int32BE.write(byteStream, item.f ?? 0x00001b89);
        Int32BE.write(byteStream, item.g ?? 0x00001b8a);
      } else {
        Int32BE.write(byteStream, 0);
      }
    }
  }
}

module.exports = EquipmentDataMessage;
