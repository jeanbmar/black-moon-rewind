const ByteStream = require('@black-moon-rewind/byte-stream');
const Type = require('./type');

module.exports = Object.fromEntries(
  [
    'DoubleBE',
    'DoubleLE',
    'FloatBE',
    'FloatLE',
    'Int8',
    'Int16BE',
    'Int16LE',
    'Int24BE',
    'Int24LE',
    'Int32BE',
    'Int32LE',
    'Int40BE',
    'Int40LE',
    'Int48BE',
    'Int48LE',
    'UInt8',
    'UInt16BE',
    'UInt16LE',
    'UInt24BE',
    'UInt24LE',
    'UInt32BE',
    'UInt32LE',
    'UInt40BE',
    'UInt40LE',
    'UInt48BE',
    'UInt48LE',
    'Buffer',
    'String',
  ].map((type) => {
    const typeClass = class extends Type {};
    Object.defineProperty(typeClass, 'name', { value: type });
    typeClass.prototype.read = ByteStream.prototype[`read${type}`];
    typeClass.prototype.write = ByteStream.prototype[`write${type}`];
    return [type, typeClass];
  })
);
