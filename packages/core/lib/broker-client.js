const { EventEmitter } = require('events');
const { v4: uuidv4 } = require('uuid');
const amqp = require('amqplib');

class BrokerClient extends EventEmitter {
  constructor(options = {}) {
    super();
    this.id = uuidv4();
    if (options.prefix) {
      this.id = `${options.prefix}-${this.id}`;
    }
    this.client = null;
    this.channel = null;
    this.seq = 1;
  }

  nextUid() {
    const uid = `${this.id}-${this.seq}`;
    this.seq += 1;
    return uid;
  }

  static async connect(url, options) {
    const client = new this();
    await client.connect(url, options);
    return client;
  }

  async connect(url, options) {
    this.client = await amqp.connect(url, options);
    this.channel = await this.client.createChannel();
    return this.channel;
  }

  consume(queue, listener) {
    super.on(queue, listener);
    const { channel } = this;
    (async () => {
      try {
        await channel.assertQueue(queue, { durable: false });
        await channel.consume(
          queue,
          (msg) => this.emit(queue, this.deserialize(msg)),
          { noAck: true }
        );
      } catch (error) {
        this.emit('error');
      }
    })();
  }
}

module.exports = BrokerClient;
