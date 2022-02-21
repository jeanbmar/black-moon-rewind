const { Writable } = require('stream');

class PacketPublisher extends Writable {
  constructor(channel, options) {
    super({ objectMode: true });
    this.channel = channel;
    this.options = options;
  }

  _write({ type, payload }, encoding, callback) {
    (async () => {
      try {
        await this.channel.assertQueue(type, { durable: false });
        await this.channel.sendToQueue(type, payload, {
          headers: this.options,
        });
        callback();
      } catch (error) {
        callback(error);
      }
    })();
  }
}

module.exports = PacketPublisher;
