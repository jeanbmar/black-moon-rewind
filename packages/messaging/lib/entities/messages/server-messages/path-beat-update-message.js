const { Int16BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class PathBeatUpdateMessage extends Message {
  static type = 0x9d;

  write(byteStream) {
    Int16BE.write(byteStream, this.pathBeat);
  }
}

module.exports = PathBeatUpdateMessage;
