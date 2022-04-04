const { Int16BE } = require('../../../types');
const Message = require('../../message');

class PathBeatUpdateMessage extends Message {
  static key = 'world.pathBeatUpdate';
  static type = 20157;

  write(byteStream) {
    Int16BE.write(byteStream, this.pathBeat);
  }
}

module.exports = PathBeatUpdateMessage;
