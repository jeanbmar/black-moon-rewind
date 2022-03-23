const { MessageFactory } = require('@black-moon-rewind/messaging');
const ByteStream = require('@black-moon-rewind/byte-stream');

const decode = () => (context, push) => {
  const byteStream = new ByteStream(context.packet.payload);
  context.message = MessageFactory.getMessageByKey(context.packet.type).read(
    byteStream
  );
  push();
};

const encode = () => (context, push) => {
  const bs = new ByteStream();
  context.message.write(bs);
  context.packet = {
    type: context.message.constructor.key,
    payload: bs.toBuffer(),
  };
  push();
};

module.exports = {
  decode,
  encode,
};
