const ByteStream = require('@black-moon-rewind/byte-stream');
const { MessageFactory, Packet } = require('@black-moon-rewind/messaging');

const INCOMING_PACKET_RADIX = 10000;
const OUTGOING_PACKET_RADIX = 20000;

const getMessageKey = (packetType) => {
  const messageType = packetType + INCOMING_PACKET_RADIX;
  const messageClass = MessageFactory.getMessageByType(messageType);
  return messageClass.key;
};

const fromBuffer = () => (session, state, push) => {
  while (session.buffer.length >= 12) {
    let packetLength = session.buffer.readUInt16LE(2);
    if (packetLength === 0) {
      packetLength = 12;
    }
    if (packetLength <= session.buffer.length) {
      const byteStream = new ByteStream(session.buffer.slice(0, packetLength));
      // eslint-disable-next-line no-param-reassign
      session.buffer = session.buffer.slice(packetLength);
      const packetEntity = Packet.read(byteStream);
      const packet = {
        type: getMessageKey(packetEntity.type),
        payload: packetEntity.payload,
      };
      push(null, { ...state, packet });
    }
  }
};

const getPacketType = (key) => {
  const messageClass = MessageFactory.getMessageByKey(key);
  return messageClass.type - OUTGOING_PACKET_RADIX;
};

const byteStream = new ByteStream();
const toBuffer = () => (session, state, push) => {
  byteStream.reset();
  const packetEntity = new Packet();
  packetEntity.type = getPacketType(state.packet.type);
  packetEntity.seq = session.seq ?? 0;
  // eslint-disable-next-line no-param-reassign
  session.seq = packetEntity.seq + 1;
  packetEntity.payload = state.packet.payload;
  packetEntity.write(byteStream);
  push(null, { ...state, data: byteStream.toBuffer() });
};

module.exports = {
  fromBuffer,
  toBuffer,
};
