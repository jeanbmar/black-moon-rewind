const Packet = require('./packet');

module.exports = class ServerPacket extends Packet {
  static radix = 20000;
};
