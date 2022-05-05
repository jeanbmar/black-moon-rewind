const ByteStream = require('@black-moon-rewind/byte-stream');
const { MessageFactory } = require('@black-moon-rewind/messaging');

const deserialize = function deserialize(message) {
  const byteStream = new ByteStream(message.content);
  return MessageFactory.getMessageByKey(message.properties.type).read(
    byteStream
  );
};

const serialize = function serialize(message) {
  const bs = new ByteStream();
  message.write(bs);
  return bs.toBuffer();
};

module.exports = {
  deserialize,
  serialize,
};
