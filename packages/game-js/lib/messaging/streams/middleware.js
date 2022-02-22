const { Transform } = require('stream');

class Middleware extends Transform {
  constructor() {
    super({ objectMode: true });
    this.clientId = -1;
    this.on('pipe', this.handlePipe.bind(this));
  }

  handlePipe(source) {
    this.clientId = source.clientId;
  }

  // eslint-disable-next-line class-methods-use-this
  transform() {
    // override
  }

  _transform(object, encoding, callback) {
    (async () => {
      try {
        const result = await this.transform(object);
        callback(null, result);
      } catch (error) {
        callback(error);
      }
    })();
  }
}

module.exports = Middleware;
