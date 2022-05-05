const ByteStream = require('@black-moon-rewind/byte-stream');
const {
  ClientPacket,
  ServerPacket,
  MessageFactory,
} = require('@black-moon-rewind/messaging');

const deserialize = function deserialize(session, buffer) {
  if (buffer.length >= 12) {
    let size = buffer.readUInt16LE(2);
    if (size === 0) size = 12;
    if (size <= buffer.length) {
      const readStream = new ByteStream(buffer.subarray(0, size));
      const packet = ClientPacket.read(readStream);
      const { service, key } = MessageFactory.getMessageByType(packet.type);
      return {
        service,
        key,
        payload: packet.payload,
        size,
      };
    }
  }
  return null;
};

const writeStream = new ByteStream();

const serialize = function serialize(session, message) {
  writeStream.reset();
  const packet = new ServerPacket();
  packet.type = MessageFactory.getMessageByKey(message.properties.type).type;
  packet.seq = session.totalSent;
  session.totalSent += 1;
  packet.payload = message.content;
  packet.write(writeStream);
  return writeStream.toBuffer();
};

module.exports = {
  deserialize,
  serialize,
};
