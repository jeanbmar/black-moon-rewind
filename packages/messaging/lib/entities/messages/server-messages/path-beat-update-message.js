const { Int16BE } = require('@black-moon-rewind/byte-stream-scalars');
const Message = require('../../message');

class PathBeatUpdateMessage extends Message {
  static type = 20157;

  write(byteStream) {
    Int16BE.write(byteStream, this.pathBeat);
  }
}

module.exports = PathBeatUpdateMessage;
