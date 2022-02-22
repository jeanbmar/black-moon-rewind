const { Transform } = require('stream');

class Middleware extends Transform {
  constructor() {
    super({ objectMode: true });
    this.clientId = -1;
    this.on('pipe', this.handlePipe.bind(this));
  }

  handlePipe(source) {
    // todo bind a whole metadata object instead
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
        if (result !== undefined) {
          callback(null, result);
        } else {
          callback();
        }
      } catch (error) {
        callback(error);
      }
    })();
  }
}

module.exports = Middleware;
