const {
  Int8,
  UInt8,
  UInt16BE,
  Int16BE,
  Int32BE,
  UInt32BE,
} = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class SpellListMessage extends Message {
  static type = 0x3e;

  constructor() {
    super();
    this.spells = [{ id: 0x0a21 }];
  }

  write(byteStream) {
    UInt16BE.write(byteStream, this.mana ?? 0x20);
    UInt16BE.write(byteStream, this.maxMana ?? 0x20);
    UInt16BE.write(byteStream, this.spells.length);
    for (let i = 0; i < this.spells.length; i += 1) {
      const spell = this.spells[i];
      if (spell) {
        Int16BE.write(byteStream, spell.id);
        Int8.write(byteStream, spell.manaCost ?? 0x1a);
        Int16BE.write(byteStream, spell.c ?? 2);
        Int32BE.write(byteStream, spell.d ?? 0);
        Int16BE.write(byteStream, spell.e ?? 0);
        Int16BE.write(byteStream, spell.f ?? 0);
        UInt16BE.write(byteStream, spell.g ?? 1);
        Int32BE.write(byteStream, spell.h ?? 0x00068638);
        UInt32BE.write(byteStream, spell.i ?? 0x00019ae1);
        UInt8.write(byteStream, spell.j ?? 0x05);
        Int32BE.write(byteStream, spell.k ?? 0x00019ae0);
        UInt32BE.write(byteStream, spell.l ?? 0x05);
      } else {
        Int16BE.write(byteStream, 0);
      }
    }
  }
}

module.exports = SpellListMessage;
