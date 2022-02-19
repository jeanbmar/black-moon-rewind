const { Transform } = require('stream');
const { Buffer } = require('buffer');
const { MessageManager } = require('@black-moon-rewind/messaging');
const ByteStream = require('@black-moon-rewind/byte-stream');

class MessageWriter extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    console.log('trannnzforml');
  }
}

module.exports = MessageWriter;
