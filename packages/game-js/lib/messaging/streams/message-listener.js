const { Writable } = require('stream');
const Client = require('../client');

class MessageListener extends Writable {
  constructor(listener) {
    super({ objectMode: true });
    this.listener = listener;
  }

  _write({ clientId, message }, encoding, callback) {
    try {
      const client = new Client(clientId);
      (async () => {
        try {
          // todo add wrapper to disconnect client gracefully on logic error
          await this.listener(message, client);
        } catch (error) {
          this.emit('error', error);
        }
      })();
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = MessageListener;
