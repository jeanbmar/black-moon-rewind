const { Transform } = require('stream');
const { MessageFactory } = require('@black-moon-rewind/messaging');
const ByteStream = require('@black-moon-rewind/byte-stream');

class MessageReader extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform({ type, payload, ...object }, encoding, callback) {
    try {
      const byteStream = new ByteStream(payload);
      const message = MessageFactory.getMessageByKey(type).read(byteStream);
      this.push({ message, ...object });
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = MessageReader;
