const ByteStream = require('@black-moon-rewind/byte-stream');
const { MessageFactory } = require('@black-moon-rewind/messaging');

const fromPacket = () => (session, state, push) => {
  const byteStream = new ByteStream(state.packet.payload);
  const message = MessageFactory.getMessageByKey(state.packet.type).read(
    byteStream
  );
  push(null, { ...state, message });
};

const toPacket = () => (session, state, push) => {
  const bs = new ByteStream();
  state.message.write(bs);
  const packet = {
    type: state.message.constructor.key,
    payload: bs.toBuffer(),
  };
  push(null, { ...state, packet });
};

module.exports = {
  fromPacket,
  toPacket,
};
