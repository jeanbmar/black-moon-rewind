const { Transform } = require('stream');
const ByteStream = require('@black-moon-rewind/byte-stream');

class MessageWriter extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform({ message, ...object }, encoding, callback) {
    try {
      const bs = new ByteStream();
      message.write(bs);
      this.push({
        type: message.constructor.key,
        payload: bs.toBuffer(),
        ...object,
      });
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = MessageWriter;
