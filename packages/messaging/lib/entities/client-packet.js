const Packet = require('./packet');

module.exports = class ClientPacket extends Packet {
  static radix = 10000;
};
