const { UInt8, UInt16BE, Int16BE, UInt32BE } = require('../../../types');
const Message = require('../../message');

class CharacterDataMessage extends Message {
  static key = 'world.characterData';
  static type = 20013;

  constructor() {
    super();
    this.items = [];
  }

  write(byteStream) {
    UInt32BE.write(byteStream, this.id);
    UInt8.write(byteStream, this.newChar ? 1 : 0);
    UInt16BE.write(byteStream, this.x ?? 0x34);
    UInt16BE.write(byteStream, this.y ?? 0x4a);
    UInt16BE.write(byteStream, this.z ?? 0x93);
    UInt32BE.write(byteStream, this.health ?? 0x32);
    UInt32BE.write(byteStream, this.maxHealth ?? 0x32);
    UInt32BE.write(byteStream, this.mana ?? 0x32);
    Int16BE.write(byteStream, 0x20);
    Int16BE.write(byteStream, 0x20);
    Int16BE.write(byteStream, 0x20);
    Int16BE.write(byteStream, this.level ?? 2);
    UInt32BE.write(byteStream, 0);
    UInt32BE.write(byteStream, 0);
    UInt32BE.write(byteStream, 0);
    UInt32BE.write(byteStream, 0x82);
    UInt32BE.write(byteStream, 0);
    UInt32BE.write(byteStream, 0);
    Int16BE.write(byteStream, 0x09);
    Int16BE.write(byteStream, 0x09);
    Int16BE.write(byteStream, 0x32);
    Int16BE.write(byteStream, 0x32);
    Int16BE.write(byteStream, 0x28);
    Int16BE.write(byteStream, 0x0a);
    Int16BE.write(byteStream, 0x0a);
    Int16BE.write(byteStream, 0x0a);
    Int16BE.write(byteStream, 0x32);
    Int16BE.write(byteStream, 0x32);
    Int16BE.write(byteStream, 0x28);
    Int16BE.write(byteStream, 0x0a);
    Int16BE.write(byteStream, 0x0a);
    Int16BE.write(byteStream, 0x0a);
    Int16BE.write(byteStream, 0x0c);
    Int16BE.write(byteStream, 0x0a);
    Int16BE.write(byteStream, 0x0c);
    Int16BE.write(byteStream, 0x0c);
    Int16BE.write(byteStream, 0x0a);
    Int16BE.write(byteStream, 0x0c);
    Int16BE.write(byteStream, 0x0a);
    Int16BE.write(byteStream, 0x10);
    Int16BE.write(byteStream, 0xfa);
    UInt32BE.write(byteStream, 0x20);
    UInt32BE.write(byteStream, 1);
    UInt32BE.write(byteStream, 3);
    Int16BE.write(byteStream, 0x0a);
    Int16BE.write(byteStream, 0x0a);
    UInt32BE.write(byteStream, 0);
    UInt32BE.write(byteStream, 0x0006ae90);
    UInt8.write(byteStream, 1);
    UInt8.write(byteStream, 3);
    Int16BE.write(byteStream, this.items.length);
    this.items.forEach((item) => {
      UInt32BE.write(byteStream, item.id);
      UInt8.write(byteStream, item.slot);
    });
    UInt8.write(byteStream, 0);
    UInt8.write(byteStream, 0x14);
    UInt8.write(byteStream, 0x3c);
    UInt8.write(byteStream, 0x3c);
    UInt8.write(byteStream, 0x18);
    UInt8.write(byteStream, 0x07);
    UInt8.write(byteStream, 0x04);
    UInt8.write(byteStream, 0x0c);
    UInt8.write(byteStream, 0x00);
    UInt8.write(byteStream, 0x29);
    UInt8.write(byteStream, 0x10);
    UInt8.write(byteStream, 0x05);
    UInt8.write(byteStream, 0x00);
    UInt8.write(byteStream, 0x09);
    UInt32BE.write(byteStream, this.year ?? 2022);
    Int16BE.write(byteStream, this.pathBeat ?? 0xaf);
    UInt8.write(byteStream, 0x00);
    UInt8.write(byteStream, 0x00);
  }
}

module.exports = CharacterDataMessage;
