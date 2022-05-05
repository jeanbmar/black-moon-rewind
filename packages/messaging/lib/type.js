class Type {
  static read(byteStream, options) {
    return this.prototype.read.call(byteStream, options);
  }

  // eslint-disable-next-line class-methods-use-this
  read() {}

  static write(byteStream, value, options) {
    this.prototype.write.call(byteStream, value, options);
  }

  // eslint-disable-next-line class-methods-use-this
  write() {}
}

module.exports = Type;
