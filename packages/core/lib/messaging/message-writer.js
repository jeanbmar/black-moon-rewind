const { Middleware } = require('@black-moon-rewind/game-js');
const ByteStream = require('@black-moon-rewind/byte-stream');

class MessageWriter extends Middleware {
  // eslint-disable-next-line class-methods-use-this
  transform({ message, ...object }) {
    const bs = new ByteStream();
    message.write(bs);
    return {
      type: message.constructor.key,
      payload: bs.toBuffer(),
      ...object,
    };
  }
}

module.exports = () => new MessageWriter();
