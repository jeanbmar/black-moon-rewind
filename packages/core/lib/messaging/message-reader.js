const { Middleware } = require('@black-moon-rewind/game-js');
const { MessageFactory } = require('@black-moon-rewind/messaging');
const ByteStream = require('@black-moon-rewind/byte-stream');

class MessageReader extends Middleware {
  // eslint-disable-next-line class-methods-use-this
  transform({ type, payload, ...object }) {
    const byteStream = new ByteStream(payload);
    const message = MessageFactory.getMessageByKey(type).read(byteStream);
    return { message, ...object };
  }
}

module.exports = () => new MessageReader();
