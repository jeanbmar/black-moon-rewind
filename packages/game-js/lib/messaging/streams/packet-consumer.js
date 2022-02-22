const { Readable } = require('stream');

class PacketConsumer extends Readable {
  constructor(channel, queue) {
    super({ objectMode: true });
    this.channel = channel;
    this.queue = queue;
  }

  _construct(callback) {
    (async () => {
      try {
        await this.channel.assertQueue(this.queue, { durable: false });
        await this.channel.consume(
          this.queue,
          (rabbitMessage) => {
            try {
              this.push({
                type: rabbitMessage.fields.routingKey,
                payload: rabbitMessage.content,
                ...rabbitMessage.properties.headers,
              });
            } catch (error) {
              this.emit('error', error);
            }
          },
          { noAck: true }
        );
        callback();
      } catch (error) {
        callback(error);
      }
    })();
  }

  // eslint-disable-next-line class-methods-use-this
  _read() {
    // this is a noop since we get data from channel.consume
  }
}

module.exports = PacketConsumer;
