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
  while (context.state.buffer.length >= 12) {
    let packetLength = context.state.buffer.readUInt16LE(2);
    if (packetLength === 0) {
      packetLength = 12;
    }
    if (packetLength <= context.state.buffer.length) {
      const byteStream = new ByteStream(
        context.state.buffer.slice(0, packetLength)
      );
      context.state.buffer = context.state.buffer.slice(packetLength);
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
  packet.seq = context.state.count ?? 0;
  context.state.count = packet.seq + 1;
  packet.payload = context.packet.payload;
  packet.write(byteStream);
  context.data = byteStream.toBuffer();
  push();
};

module.exports = {
  fromBuffer,
  toBuffer,
};
