const ByteStream = require('@black-moon-rewind/byte-stream');
const { MessageFactory, Packet } = require('@black-moon-rewind/messaging');

const INCOMING_PACKET_RADIX = 10000;
const OUTGOING_PACKET_RADIX = 20000;

const getMessageKey = (packetType) => {
  const messageType = packetType + INCOMING_PACKET_RADIX;
  const messageClass = MessageFactory.getMessageByType(messageType);
  return messageClass.key;
};

const fromBuffer = () => (context, push) => {
  while (context.session.buffer.length >= 12) {
    let packetLength = context.session.buffer.readUInt16LE(2);
    if (packetLength === 0) {
      packetLength = 12;
    }
    if (packetLength <= context.session.buffer.length) {
      const byteStream = new ByteStream(
        context.session.buffer.slice(0, packetLength)
      );
      context.session.buffer = context.session.buffer.slice(packetLength);
      const packet = Packet.read(byteStream);
      context.packet = {
        type: getMessageKey(packet.type),
        payload: packet.payload,
      };
      push();
    }
  }
};

const getPacketType = (key) => {
  const messageClass = MessageFactory.getMessageByKey(key);
  return messageClass.type - OUTGOING_PACKET_RADIX;
};

const byteStream = new ByteStream();
const toBuffer = () => (context, push) => {
  byteStream.reset();
  const packet = new Packet();
  packet.type = getPacketType(context.packet.type);
  packet.seq = context.session.count ?? 0;
  context.session.count = packet.seq + 1;
  packet.payload = context.packet.payload;
  packet.write(byteStream);
  context.data = byteStream.toBuffer();
  push();
};

module.exports = {
  fromBuffer,
  toBuffer,
};
